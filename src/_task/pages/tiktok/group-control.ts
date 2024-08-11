import TKLoginPage from "./login";
import { arrangeWindowsInGrid } from "../../utils/grid";
import { UTILS} from "../../utils/type";
type PageConfig = UTILS.PageConfig;

/**
 * @description $ $
 * @author zxt
 * @date: 2024/8/10
 * @copyright
 */
const GroupControl = async (pages: PageConfig[]) => {
  const list = await Promise.all(
    pages.map(async (page) => {
      const t = await TKLoginPage.create(page);
      return t;
    })
  );

  await arrangeWindowsInGrid(
    list,
    { rows: 2, cols: 4 }
  );
  for (const tkLoginPage of list) {
    tkLoginPage
      .inputAuthInfo()
      .then(() => {})
      .catch((err: any) => {});
  }
  return list;
};

export default GroupControl;
