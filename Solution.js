const user = [
    {
        id: 1,
        username: "lala",
        address: "Jakarta"
    }, 
    {
        id: 2,
        username: "lili",
        address: "Surabaya"
    }
]

const transaction = [
    {
        user_id: 1,
        transaction: [
            {
                id: 1,
                status: "Selesai"
            },
            {
                id: 2,
                status: "Sedang dikirim"
            }
        ]
    },
    {
        user_id: 2,
        transaction: [
            {
                id: 1,
                status: "Selesai"
            },
            {
                id: 2,
                status: "Dibatalkan"
            }
        ]
    }
]

const detailTransaction = [
    {
        id: 1,
        productName: "Kopi Hitam",
        qty: 3,
        totalAmount: 3000
    },
    {
        id: 2,
        productName: "Gula Pasir",
        qty: 1,
        totalAmount: 5000
    }
]

//Callback
const login = (username, callback) => {
    setTimeout(() => {
        return callback({
            id: 1,
            username: username,
            address: "Jakarta"
        });
    }, 2000);
}

const getTransaction = (user_id, callback) => {
    setTimeout(() => {
        return callback(transaction.filter((item) => {
            return item.user_id === user_id;
        }));
    }, 2000);
}

const getDetailTransaction = (transaction_id, callback) => {
    setTimeout(() => {
        return callback(detailTransaction.filter((item) => {
            return item.id === transaction_id;
            }));
    }, 2000);
}

//Then Catch
login("lala", (user) => {
    getTransaction(user.id, (transaction) => {
        getDetailTransaction(transaction[0].transaction[0].id, (detailTransaction) => {
            console.log(detailTransaction);
        });
    });
});

//Promises
const loginPromise = (username) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                username: username,
                address: "Jakarta"
            });
        }, 2000);
    });
}

const getTransactionPromise = (user_id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(transaction.filter((item) => {
                return item.user_id === user_id;
            }));
        }, 2000);
    });
}

const getDetailTransactionPromise = (transaction_id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(detailTransaction.filter((item) => {
                return item.id === transaction_id;
            }));
        }, 2000);
    });
}

//Then Catch
loginPromise("lala").then((user) => {
    return getTransactionPromise(user.id);
}).then((transaction) => {
    return getDetailTransactionPromise(transaction[0].transaction[0].id);
}).then((detailTransaction) => {
    console.log(detailTransaction);
}).catch((err) => {
    console.log(err);
});

//Async Await
const getDetailTransactionAsync = async () => {
    const login = await loginPromise("lala");
    const transaction = await getTransactionPromise(login.id);
    const detailTransaction = await getDetailTransactionPromise(transaction[0].transaction[0].id);
    console.log(detailTransaction);
}

getDetailTransactionAsync();