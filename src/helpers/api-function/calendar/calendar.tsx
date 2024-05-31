import axios from "axios";
import { config } from "../../token";
import { service_category_list } from "../../api";

// interface Data {
//     id: string;
//     name: string;
//   }
  
export const getCategoryId = (setCategory: (data: []) => void) => {
  axios
    .get(service_category_list, config)
    .then((res) => {
      if (res.data.success) {
        setCategory(res.data.body);
      } else {
        console.log("null");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};


// export const getCalendar = () => {
//     axios
//       .get(`${calendar_url}?localDate=2024-05-30`, config)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };
