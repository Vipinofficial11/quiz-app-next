import { IoManager } from "./managers/IoManager";
import { UserManager } from "./managers/UserManager";

const io = IoManager.getIo();

io.listen(3003);
const userManager = new UserManager();
io.on("connection", (socket) => {
  userManager.addUser(socket);
});
