// const dataToPush = [
//   {
//     date: new Date(2023, 1, 23),
//     lent: true,
//     otherParty: "Bob",
//     itemName: "baking pan",
//     id: 1,
//   },
//   {
//     date: new Date(2022, 4, 17),
//     lent: false,
//     otherParty: "Elsa",
//     itemName: "cooking pan",
//     id: 2,
//   },
//   {
//     date: new Date(2022, 1, 11),
//     lent: true,
//     otherParty: "Anna",
//     itemName: "spatula",
//     id: 3,
//   },
//   {
//     date: new Date(2022, 0, 13),
//     lent: false,
//     otherParty: "Betty",
//     itemName: "strainer",
//     id: 4,
//   },
// ];

// function pushTransactions() {
//   console.log("In push transactions");
//   fetch(
//     "https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/" + id.toString(),
//     {
//       method: "GET",
//       headers: { "content-type": "application/json" },
//     },
//   )
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       // handle error
//     })
//     .then((tasks) => {
//       console.log("Before pushing");
//       console.log(tasks.transactions);
//       for (let i = 0; i < dataToPush.length; i++) {
//         tasks.transactions.push(dataToPush[i]);
//       }
//       console.log("Transactions");
//       console.log(tasks.transactions);
//       fetch(
//         "https://64c881f3a1fe0128fbd5db6f.mockapi.io/posts/" + id.toString(),
//         {
//           method: "PUT", // or PATCH
//           headers: { "content-type": "application/json" },
//           body: JSON.stringify({
//             transactions: tasks.transactions,
//           }),
//         },
//       )
//         .then((res) => {
//           if (res.ok) {
//             return res.json();
//           }
//           // handle error
//         })
//         .then((task) => {
//           // Do something with updated task
//         })
//         .catch((error) => {
//           // handle error
//         });
//     })
//     .catch((error) => {
//       // handle error
//     });
// }

// // pushTransactions();
