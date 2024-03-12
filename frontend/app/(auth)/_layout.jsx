import { Tabs, usePathname, useRouter } from "expo-router";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={"#000"} />
    </Pressable>
  );
};

const TabsPage = () => {
  const { isSignedIn } = useAuth();

  const pathname = usePathname();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#F3E7FD",
        },
        headerTintColor: "#000",
        tabBarActiveBackgroundColor: "#F3E7FD",
        // tabBarInactiveBackgroundColor: '#F3E7FD',

        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#888",
        tabBarItemStyle: {
          borderTopWidth: 1,

          borderTopColor: "#fff",
          // borderColor: "#000",
          // borderWidth: 1,
          borderRadius: 5,
        },

        // tabBarActiveTintColor: '#000',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: "Home",
          tabBarItemStyle: {
            borderTopColor: `${pathname.includes("home") ? "#000" : null}`,
            borderTopWidth: `${pathname.includes("home") ? 1 : 0}`,
          },
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="crop-identify"
        options={{
          headerTitle: "Crop Identification",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="sun-plant-wilt" size={size} color={color} />
          ),
          tabBarLabel: "Crop",
          tabBarItemStyle: {
            borderTopColor: `${pathname.includes("iden") ? "#000" : null}`,
            borderTopWidth: `${pathname.includes("iden") ? 1 : 0}`,
          },
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="crop-disease"
        options={{
          headerTitle: "Crop Disease Identification",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="plant-wilt" size={size} color={color} />
          ),
          tabBarItemStyle: {
            borderTopColor: `${pathname.includes("dise") ? "#000" : null}`,
            borderTopWidth: `${pathname.includes("dise") ? 1 : 0}`,
          },
          tabBarLabel: "Crop Disease",
        }}
        redirect={!isSignedIn}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "My Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          tabBarLabel: "My Profile",
          headerRight: () => <LogoutButton />,
          tabBarItemStyle: {
            borderTopColor: `${pathname.includes("pro") ? "#000" : null}`,
            borderTopWidth: `${pathname.includes("pro") ? 1 : 0}`,
          },
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
};

export default TabsPage;
