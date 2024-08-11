/**
 * @description $DESC$
 * @author ztx
 * @date: 2024/7/30
 * @copyright
 */
import { UTILS} from "../type";

const TYUsers: UTILS.PageConfig[] = [
  {
    auth: { username: 'swiftobject@gmail.com', password: 'ME.com1122' },
    proxy: {
      server: 'http://myproxy.com:3128',
      username: 'user',
      password: 'pass'
    }
  },
  {
    auth: { username: 'oozymoo@gmail.com', password: 'ME.com1122' },
    proxy: {
      server: 'http://myproxy.com:3128',
      username: 'user',
      password: 'pass'
    }
  },
  {
    auth: { username: 'oozxtoo@gmail.com', password: 'ME.com1122' },
    proxy: {
      server: 'http://myproxy.com:3128',
      username: 'user',
      password: 'pass'
    }
  }
];
export default TYUsers;
