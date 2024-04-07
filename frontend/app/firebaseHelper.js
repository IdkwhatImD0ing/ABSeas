import { storage } from './firebase-config';
import { ref, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';

export const fetchInfo = async (fileName) => {
  const [downloadUrl, setDownloadUrl] = useState('');
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (fileName) {
      setLoading(true);
      const fileRef = ref(storage, `song_data/${fileName}`);

      getDownloadURL(fileRef)
        .then((url) => {
          // Set the download URL to state, if needed
          setDownloadUrl(url);

          // Fetch the JSON content directly
          fetch(url)
            .then(response => response.json())
            .then(data => {
              setJsonData(data);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching JSON content", error);
              setLoading(false);
            });
        })
        .catch((error) => {
          console.error("Error getting download URL", error);
          setLoading(false);
        });
    }
  })
};