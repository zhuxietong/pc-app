declare namespace TP {
    type Const = {
        window: {
            width: number;
            height: number;
            deviceScaleFactor:number;
        }
    }

    type Frame = {
        x: number;
        y: number;
        width?: number;
        height?: number;
    }

    type Proxy = {
        server: string
        username: string
        password: string
    }

    type User = {
        auth: {
            username: string;
            password: string;
        },
        proxy?: Proxy,
    }
}