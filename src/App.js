import { useState, useEffect, useRef } from "react";
import {
	collection,
	query,
	onSnapshot,
	doc,
	updateDoc,
	addDoc,
	deleteDoc,
	orderBy,
} from "firebase/firestore";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { db } from "./firebase";
import { AiOutlinePlus } from "react-icons/ai";
import Spinner from "./Spinner";
import Todo from "./Todo";

const classes = {
	bg: `bg-gradient-to-r from-emerald-600 to-emerald-400 h-screen w-screen p-4 pt-24`,
	container: `max-w-xl bg-slate-100 mx-auto py-6 px-8 rounded-xl shadow-2xl`,
	heading: `text-3xl p-2 font-bold text-gray-700 text-center`,
	form: `mt-4 flex justify-between gap-4`,
	input: `w-full px-4 py-2 focus:ring-2 rounded-xl focus:outline-none focus:ring-emerald-500 text-xl ring-2 ring-slate-200/90`,
	button: `bg-emerald-500 p-4 rounded-lg text-slate-100 shadow-lg focus:outline-none focus:ring-emerald-700 focus:ring-2`,
	count: `text-center mt-4 p-4 text-md text-gray-700 `,
};

function App() {
	const [todos, setTodos] = useState([]);
	const inputRef = useRef();
	const [loading, setLoading] = useState(true);
	console.log("app");
	// Read
	useEffect(() => {
		const q = query(collection(db, "todos"), orderBy("text"));
		const unsubscribe = onSnapshot(q, querySnapshot => {
			let todosArray = [];
			querySnapshot.forEach(doc => {
				todosArray.push({ ...doc.data(), id: doc.id });
			});
			setTodos(todosArray);
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	// Create
	const addTodo = async e => {
		const inputEl = inputRef.current.value;
		e.preventDefault();
		if (inputEl.length === 0) {
			alert("Please fill input");
			return;
		}
		inputRef.current.value = "";
		await addDoc(collection(db, "todos"), {
			text: inputEl,
			completed: false,
		});
	};

	// Update
	const toggleComplete = async todo => {
		await updateDoc(doc(db, "todos", todo.id), {
			completed: !todo.completed,
		});
	};

	// Delete
	const deleteTodo = async id => {
		await deleteDoc(doc(db, "todos", id));
	};
	return (
		<div className={classes.bg}>
			<div className={classes.container}>
				<h3 className={classes.heading}>Todo App</h3>
				<form onSubmit={addTodo} className={classes.form}>
					<input
						className={classes.input}
						type="text"
						placeholder="Add todo"
						ref={inputRef}
					/>
					<button className={classes.button}>
						<AiOutlinePlus size={30} />
					</button>
				</form>
				{loading && <Spinner />}
				{!loading && (
					<div>
						<ul className="mt-4 space-y-2">
							<LazyMotion features={domAnimation}>
								<AnimatePresence>
									{todos.map((todo, index) => (
										<Todo
											key={index}
											todo={todo}
											toggleComplete={toggleComplete}
											deleteTodo={deleteTodo}
										/>
									))}
								</AnimatePresence>
							</LazyMotion>
						</ul>
						{todos.length < 1 ? null : (
							<p className={classes.count}>
								You have{" "}
								<span className=" text-lg font-bold text-emerald-700">
									{todos.length}
								</span>{" "}
								{`${todos.length > 1 ? "todos" : "todo"}`}
							</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
