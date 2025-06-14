import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

export const submitContactForm = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...formData,
      status: 'new',
      createdAt: serverTimestamp(),
      read: false
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: error.message };
  }
};

export const scheduleAppointment = async (appointmentData) => {
  try {
    // First, check for existing appointments at the same time
    const appointmentsRef = collection(db, 'appointments');
    const q = query(
      appointmentsRef,
      where('date', '==', appointmentData.date),
      where('time', '==', appointmentData.time)
    );
    
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return { success: false, error: 'This time slot is already booked. Please choose another time.' };
    }
    
    // If no conflict, add the new appointment
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...appointmentData,
      status: 'scheduled',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    return { success: false, error: error.message };
  }
};

export const getAvailableTimeSlots = async (date) => {
  try {
    // This is a simplified example. In a real app, you would:
    // 1. Get all appointments for the given date
    // 2. Filter out the taken time slots
    // 3. Return available slots based on working hours
    
    // For now, we'll return some sample time slots
    const workingHours = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'
    ];
    
    return { success: true, timeSlots: workingHours };
  } catch (error) {
    console.error('Error getting available time slots:', error);
    return { success: false, error: error.message };
  }
};