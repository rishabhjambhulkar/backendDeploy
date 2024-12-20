import Address from '../models/addressModel.js';

// Add a new address for a user
export const addAddress = async (req, res) => {
    try {
      const { userId, address, door, landmark, type } = req.body;
  
      // Check if a document already exists for the user
      let userAddresses = await Address.findOne({ userId });
  
      if (userAddresses) {
        // Add the new address to the existing addresses array
        userAddresses.addresses.push({ address, door, landmark, type });
        await userAddresses.save();
      } else {
        // Create a new document for the user with the first address
        userAddresses = new Address({
          userId,
          addresses: [{ address, door, landmark, type }]
        });
        await userAddresses.save();
      }
  
      res.status(201).json(userAddresses);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Get all addresses for a user
  export const getUserAddresses = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const userAddresses = await Address.findOne({ userId });
      if (!userAddresses) {
        return res.status(404).json({ message: 'No addresses found for this user.' });
      }
  
      res.status(200).json(userAddresses);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Update a specific address for a user
  export const updateAddress = async (req, res) => {
    try {
      const { userId, addressId } = req.params;
      const updatedData = req.body;
  
      const userAddresses = await Address.findOne({ userId });
      if (!userAddresses) {
        return res.status(404).json({ message: 'No addresses found for this user.' });
      }
  
      const address = userAddresses.addresses.id(addressId);
      if (!address) {
        return res.status(404).json({ message: 'Address not found.' });
      }
  
      // Update the specific address
      Object.assign(address, updatedData, { updatedAt: Date.now() });
      await userAddresses.save();
  
      res.status(200).json(userAddresses);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Delete a specific address for a user
  export const deleteAddress = async (req, res) => {
    try {
      const { userId, addressId } = req.params;
  
      const userAddresses = await Address.findOne({ userId });
      if (!userAddresses) {
        return res.status(404).json({ message: 'No addresses found for this user.' });
      }
  
      // Remove the specific address
      const address = userAddresses.addresses.id(addressId);
      if (!address) {
        return res.status(404).json({ message: 'Address not found.' });
      }
  
      address.remove();
      await userAddresses.save();
  
      res.status(200).json({ message: 'Address deleted successfully.', addresses: userAddresses.addresses });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };