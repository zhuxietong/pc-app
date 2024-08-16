/**
 * 异步获取获取DT.User数组
 */
export async function getUsers(): Promise<TP.User[]> {
    return new Promise((resolve, reject) => {
        // const list = [{
        //     auth: {username: 'oozymoo@gmail.com', password: 'ME.com1122'},
        //     proxy: {
        //         server: '191.102.137.100:8000',
        //         username: '9AUfR6',
        //         password: 'SHeQov'
        //     }
        // },
        //     {
        //         auth: {username: 'swiftobject@gmail.com', password: 'ME.com1122'},
        //         proxy: {
        //             server: 'http://45.87.242.21:8000',
        //             username: 'CWkjkx',
        //             password: 'uYgeRE'
        //         }
        //     },
        //     {
        //         auth: {username: 'oozxtoo@gmail.com', password: 'ME.com1122'}
        //     }
        // ]
        const list = [{
            auth: {username: 'zhuxietong', password: '111111'},
            // proxy: {
            //     server: '191.102.137.100:8000',
            //     username: '9AUfR6',
            //     password: 'SHeQov'
            // }
        },
            {
                auth: {username: 'B0001', password: '111111'},
                // proxy: {
                //     server: 'http://45.87.242.21:8000',
                //     username: 'CWkjkx',
                //     password: 'uYgeRE'
                // }
            },
            {
                auth: {username: 'B0002', password: '111111'}
            }
        ]
        resolve(list)
    })
}

