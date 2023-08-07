import { Stack } from "expo-router";
import { Button, YStack } from "tamagui";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import Menu from "../src/components/menu";

export default () => {
  const router = useRouter();
  const [avail, setAvail] = useState([]);

  const fetchAvailData = () => {
    fetch("https://64c881f3a1fe0128fbd5db6f.mockapi.io/available")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAvail(data);
      });
  };

  useEffect(() => {
    fetchAvailData();
  }, []);

  fetch("https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/1", {
    method: "PUT", // or PATCH
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ available: avail }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    })
    .then((task) => {
      fetch("https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/1", {
        method: "PUT", // or PATCH
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ basket: task.basketList.length }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          // handle error
        })
        .then((task) => {
          // console.log(task);
          // Do something with updated task
        })
        .catch((error) => {
          // handle error
        });

      // console.log(task);
      // console.log(task);
    })
    .catch((error) => {
      // handle error
    });

  // const [isOpeningScreenVisible, setOpeningScreenVisible] = useState(true);
  // setTimeout(() => {
  //   setOpeningScreenVisible(false);
  // }, 5000);

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

      <Image source={require("../assets/logo.png")} style={styles.imageStyle} />
      <Menu />
      {/* <Button
        href="/login"
        onPress={() => router.replace("/login")}
        style={{ margin: 10 }}
      >
        Click Me
      </Button>
      <Button href="/login" onPress={() => router.replace("/postform")}>
        Make a post form!
      </Button> */}
    </YStack>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
