app.get('/pets', async (req, res) => {
    // Extract query parameters
    const page = parseInt(req.query.page) || 1;  // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10;  // Default to 10 pets per page
    const skip = (page - 1) * limit;  // Calculate the number of records to skip
    const searchTerm = req.query.search || '';  // Default to empty string if not provided
    const category = req.query.category || '';  // Default to empty string if not provided
  
    try {
      // Build the query for MongoDB
      const query = {
        adopted: false,  // Only fetch non-adopted pets
        name: { $regex: searchTerm, $options: 'i' }  // Case-insensitive search for name
      };
  
      // If a category is provided, add to the query
      if (category) {
        query.category = category;
      }
  
      // Fetch pets from MongoDB, applying filters, pagination, and sorting by date
      const result = await petCollection
        .find(query)
        .sort({ date: -1 })  // Sort by date in descending order
        .skip(skip)  // Skip the appropriate number of records based on the page
        .limit(limit)  // Limit the results to the specified number of pets per page
        .toArray();
  
      res.send(result);  // Send the filtered and paginated results back to the frontend
    } catch (err) {
      res.status(500).send({ message: 'Error fetching pets', error: err });
    }
  });
  