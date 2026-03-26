import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, provider, db } from "./config.js";

const authStatus = document.getElementById("auth-status");
const signInBtn = document.getElementById("sign-in-btn");
const signOutBtn = document.getElementById("sign-out-btn");
const taskSection = document.getElementById("task-section");
const taskList = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const errorMsg = document.getElementById("error-msg");

let unsubscribeTasks = null;

// Auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    authStatus.textContent = `Signed in as ${user.displayName || user.email}`;
    signInBtn.style.display = "none";
    signOutBtn.style.display = "inline-block";
    taskSection.style.display = "block";
    loadTasks(user.uid);
  } else {
    authStatus.textContent = "Not signed in";
    signInBtn.style.display = "inline-block";
    signOutBtn.style.display = "none";
    taskSection.style.display = "none";
    taskList.innerHTML = "";
    if (unsubscribeTasks) {
      unsubscribeTasks();
      unsubscribeTasks = null;
    }
  }
});

signInBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    showError(err.message);
  }
});

signOutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
  } catch (err) {
    showError(err.message);
  }
});

addTaskBtn.addEventListener("click", addTask);
newTaskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

async function addTask() {
  const text = newTaskInput.value.trim();
  if (!text) return;
  const user = auth.currentUser;
  if (!user) return;
  try {
    await addDoc(collection(db, "tasks"), {
      uid: user.uid,
      text,
      done: false,
      createdAt: Date.now(),
    });
    newTaskInput.value = "";
  } catch (err) {
    showError(err.message);
  }
}

function loadTasks(uid) {
  const q = query(
    collection(db, "tasks"),
    where("uid", "==", uid),
    orderBy("createdAt", "asc")
  );
  unsubscribeTasks = onSnapshot(q, (snapshot) => {
    taskList.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const li = document.createElement("li");
      if (data.done) li.classList.add("done");

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = data.done;
      cb.addEventListener("change", async () => {
        try {
          await updateDoc(doc(db, "tasks", docSnap.id), { done: cb.checked });
        } catch (err) {
          showError(err.message);
        }
      });

      const span = document.createElement("span");
      span.textContent = data.text;

      li.appendChild(cb);
      li.appendChild(span);
      taskList.appendChild(li);
    });
  });
}

function showError(msg) {
  errorMsg.textContent = msg;
  setTimeout(() => (errorMsg.textContent = ""), 6000);
}
