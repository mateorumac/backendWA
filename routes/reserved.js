router.post('/reserved', authenticateToken, async (req,res) => {
    const authenticatedUser = req.user;
    const userFname = authenticatedUser.name;
    const userLname = authenticatedUser.lname;
    const formData = req.body;

  // Example: Save the form data to your database
  // You can modify this logic to match your data model and storage mechanism
  try {
    // Save the form data with the authenticated user's email
    const result = await saveFormData(userEmail, formData);
    
    res.status(200).json({ message: 'Form data saved successfully', result });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving form data' });
  }
});
  module.exports = router;