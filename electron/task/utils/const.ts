import {getScreen} from "./screen";

const Const: TP.Const = {
    window: {width: 1920, height: 1080,deviceScaleFactor:1}
}

export const init = async () => {
    try {
        Const.window = (await getScreen()) as TP.Const['window']
    } catch (e) {

    }
}

export default Const;