import { Stack, useRouter } from "expo-router";
import { YStack } from "tamagui";
import { LogoScreen } from "../src/components/Logo";
import { useEffect, useState } from "react";

export default () => {
  const router = useRouter();

  const [avail, setAvail] = useState([])

  const fetchAvailData = () => {
    fetch("https://64c881f3a1fe0128fbd5db6f.mockapi.io/available")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setAvail(data)
      })
  }
  
  useEffect(() => {
    fetchAvailData()
  }, [])

  fetch('https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/1', {
    method: 'PUT', // or PATCH
    headers: {'content-type':'application/json'},
    body: JSON.stringify({available: avail})
  }).then(res => {
    if (res.ok) {
        return res.json();
    }
    // handle error
  }).then(task => {
    fetch('https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/1', {
      method: 'PUT', // or PATCH
      headers: {'content-type':'application/json'},
      body: JSON.stringify({basket: task.basketList.length})
    }).then(res => {
      if (res.ok) {
          return res.json();
      }
      // handle error
    }).then(task => {
      // console.log(task);
      // Do something with updated task
    }).catch(error => {
      // handle error
    })

    // console.log(task);
    // console.log(task);
  }).catch(error => {
    // handle error
  })


  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="white"
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <LogoScreen />
    </YStack>
  );
};
