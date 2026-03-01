import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase-config'
import localData from '../assets/operators-data'

// useOperators – custom hook that fetches operators from Firestore
// Falls back to local data if Firebase is not configured
function useOperators() {
  const [operators, setOperators] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'operators'))

        if (querySnapshot.empty) {
          // Use local data if Firestore collection is empty or not configured
          setOperators(localData)
        } else {
          const firestoreData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          setOperators(firestoreData)
        }
      } catch (error) {
        console.warn('Firebase not configured – using local data:', error.message)
        setOperators(localData)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOperators()
  }, [])

  return { operators, isLoading, hasError }
}

export default useOperators
