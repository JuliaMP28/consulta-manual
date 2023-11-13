import express from 'express';
import authenticateToken from '../../auth/auth.js';
import Manual from '../../models/manual.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {

  const aggregationQuery = [
    {
      $group: {
        _id: {
          type: '$type',
          manufacturer: '$manufacturer'
        },
        models: {
          $push: {
            _id: '$_id',
            name: '$name'
          }
        }
      }
    },
    {
      $group: {
        _id: '$_id.type',
        manufacturers: {
          $push: {
            manufacturer: '$_id.manufacturer',
            models: '$models'
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        type: '$_id',
        manufacturers: 1
      }
    },
    {
      $sort: {
        type: -1 // 1 for ascending order, -1 for descending order
      }
    }
  ];

  const queryMatch = {
    $match: {}
  }
  // get keys of req.query json
  const keys = Object.keys(req.query);
  keys.forEach((key) => {
    console.log(key);
    const regex = new RegExp(escapeRegex(req.query[key]), 'i');
    queryMatch.$match[key] = { $regex: regex };
  });

  if(!req.user.hasRestrictedAccess && !req.user.admin) {
    // adds a restriction to the query if user is admin or hasRestrictedAcess
    queryMatch.$match.isRestricted = false;
  }
  
  aggregationQuery.unshift(queryMatch);

  Manual.aggregate(aggregationQuery).exec()
  .then((result) => {
    console.log(JSON.stringify(result));
    const data = {
      logged: true,
      user: req.user,
      data: result,
      filters: req.query
    }
    console.log(data)
    res.render('list', data)
  })
  .catch((err) => {
    console.error(err);
    res.render('list', { logged: true, user: req.user, data: [], filters: req.query })
  });

});

// Function to format a date as "dd/mm/yyyy"
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

// Function to escape regex special characters
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

export default router;

