<template>
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Manage Users</h1>
      <div class="overflow-x-auto">
        <table class="table-auto w-full">
          <thead>
            <tr class="bg-gray-200">
              <th class="px-4 py-2">#</th>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Description</th>
              <th class="px-4 py-2">Price</th>
        
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in mainStore.usersList" :key="item.id">
              <td class="border px-4 py-2">{{ index + 1 }}</td>
              <td class="border px-4 py-2">{{ item.email }}</td>
              <td class="border px-4 py-2">{{ item.name }}</td>
              <td class="border px-4 py-2">{{ item.role }}</td>
              <!-- <td class="border px-4 py-2">{{ item.quantity }}</td> -->
              <td class="border px-4 py-2">
                <button @click="deleteItem(item.id)" class="text-white bg-red-500 px-3 py-1 rounded-full hover:bg-red-600">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button @click="logout">ssss</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { db } from '@/firebase/firebase'; // Import Firebase database instance
  import { getDocs, collection, where, query, deleteDoc, doc } from 'firebase/firestore';
  import { useMainStore } from '@/store/MainStore';
  import { signOut } from 'firebase/auth';
  import { auth } from '@/firebase/firebase';
  // Initialize items as empty array
  const mainStore = useMainStore();
  
  // Fetch items from Firestore
  const fetchItems = async () => {
    try {
      const collectionRef = collection(db, "user");
    //   const uid = mainStore.user.uid; // Assuming uid is in mainStore.user
  
     
  
      const q = collectionRef;
      const querySnapshot = await getDocs(q);
  
      querySnapshot.docs.forEach((doc) => {
        mainStore.usersList.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };
  
  // Delete item from Firestore and remove it from local items array
  const deleteItem = async (itemId) => {
    try {
      await deleteDoc(doc(db, 'user', itemId));
      mainStore.usersList = mainStore.usersList.filter(item => item.id !== itemId);
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };
  
  // Fetch items when component is mounted
  fetchItems();
  
  
  
   const logout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  </script>
  