// // src/context/ContextProvider.js
// import { createContext, useState, useContext } from "react";
// import axios from "axios";

// const ContextData = createContext();

// export const ContextProvider = ({ children }) => {
//   const [loading, setLoading] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState(null);
//   const [dataa, setDataa] = useState(null);

//   const handleSubmit = async (formData, font, depth, gloss, scale, color) => {
//     const updatedFormData = {
//       ...formData,
//       font,
//       depth: depth / 20,
//       gloss: gloss / 10,
//       scale: scale / 2,
//       color,
//     };
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_DOMAIN}/api/v1/user/generate-qrcode`,
//         updatedFormData
//       );
//       setDataa(response.data.data);
//       console.log(response.data, "data qr response.....");
//       if (response.data.success) {
//         setQrCodeUrl(response.data.data.qr_code);
//         return response.data.data;
//       } else {
//         alert("Failed to generate QR code. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error generating QR code:", error);
//       alert("An error occurred while generating the QR code.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ContextData.Provider value={{ handleSubmit, loading, qrCodeUrl, dataa }}>
//       {children}
//     </ContextData.Provider>
//   );
// };

// export const useData = () => useContext(ContextData);
