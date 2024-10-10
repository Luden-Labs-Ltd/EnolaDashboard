interface User {
  name: string;
  phone: string;
  token: string;
}

export async function getAuthUser(phone: string, code: string): Promise<User | undefined> {
  try {
    console.log(phone);
    
    const myPhone = ["+375(29)5757080"];

    if (myPhone.includes(phone)) {
      return {
        name: "philipp",
        phone: "375295757080",
        token: "aaaa",
      };
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
