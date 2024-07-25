import initializeFirebase from "@/config/firebase";
import initAllConsumers from "@/consumer";

import { config } from "dotenv";

config();

initializeFirebase();

initAllConsumers();
