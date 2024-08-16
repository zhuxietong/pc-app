import {TKWindow} from "./window";
import Const from "../../utils/const";
import {getGridLayout} from "../../utils/grid";

export class WindowsManager {
    windows: TKWindow[] = [];
    users: TP.User[] = [];
    grid: { row: number, col: number } = {row: 1, col: 4}

    constructor() {
    }

    loadUsers(users: TP.User[]) {
        this.users = users;
        let ws = this
        let windows = users.map(user => {
            return new TKWindow(user)
        })
        windows.forEach((window, index) => {
        })
        let index = 0
        for (const window of windows) {
            window.frame = getGridLayout(index, ws.grid, Const.window)
            index = index + 1
        }
        this.windows = windows
        return Promise.all(windows.map(window => window.load()))
    }

}