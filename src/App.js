import { useRef, useState } from "react";
import {
	collection,
	query,
	doc,
	updateDoc,
	addDoc,
	deleteDoc,
	orderBy,
} from "firebase/firestore";

import { useCollection } from "react-firebase-hooks/firestore";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { db } from "./firebase";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { RiSunFill } from "react-icons/ri";
import Spinner from "./Spinner";
import Todo from "./Todo";

const classes = {
	bg: ` bg-gradient-to-r from-emerald-600 to-emerald-400 h-screen w-screen px-2 pt-32 `,
	container: `max-w-md bg-slate-100 mx-auto py-6 px-4 rounded-lg shadow-2xl sm:py-8 sm:px-8 sm:max-w-lg dark:bg-gray-700/30 transition-all dark:shadow-800 dark:shadow-lg`,
	heading: `text-3xl  font-bold text-gray-800/90 text-center sm:text-4xl dark:text-gray-200 transition-all`,
	form: `mt-6 flex justify-between space-x-2 sm:mt-8 sm:space-x-3`,
	input: `w-full px-2 text-gray-800 focus:ring-2 rounded-lg focus:outline-none focus:ring-emerald-500 text-base ring-2  ring-slate-200/90 sm:px-3 sm:text-lg dark:bg-gray-600 dark:ring-slate-600/90 dark:text-gray-300 transition-all dark:placeholder:text-gray-300/95 dark:focus:ring-gray-300`,
	button: `bg-emerald-500 p-2 rounded-lg text-slate-100 focus:outline-none focus:ring-emerald-500 focus:ring-offset-2 focus:ring-2 hover:scale-105 hover:shadow-md hover:shadow-emerald-500/80 transition-all dark:bg-emerald-600`,
	count: `text-center mt-2 p-2 text-md text-gray-700 dark:text-gray-300/95 `,
};

function App() {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const inputRef = useRef();

	const [value, loading, error] = useCollection(
		query(collection(db, "todos"), orderBy("text")),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const todos = value?.docs?.map(doc => {
		return { ...doc.data(), id: doc.id };
	});

	// Create
	const addTodo = async e => {
		e.preventDefault();
		const inputEl = inputRef.current.value;
		if (inputEl.length === 0) {
			alert("Please fill input");
			return;
		}
		inputRef.current.value = "";
		try {
			await addDoc(collection(db, "todos"), {
				text: inputEl,
				completed: false,
			});
		} catch (error) {}
	};

	// Update
	const toggleComplete = async todo => {
		try {
			await updateDoc(doc(db, "todos", todo.id), {
				completed: !todo.completed,
			});
		} catch (error) {}
	};

	// Delete
	const deleteTodo = async id => {
		try {
			await deleteDoc(doc(db, "todos", id));
		} catch (error) {}
	};
	return (
		<div
			className={`${isDarkMode ? "dark from-gray-800 to-gray-800" : " "}${
				classes.bg
			}`}
		>
			<div className="absolute top-8 left-[50%] -translate-x-[50%]">
				<button
					onClick={() => setIsDarkMode(prevState => !prevState)}
					className="flex h-12 w-12 items-center justify-center rounded-full bg-white transition-all hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:hover:shadow-gray-500/40 dark:focus:ring-gray-300 sm:h-14 sm:w-14"
				>
					{isDarkMode ? (
						<BsFillMoonStarsFill className="text-[24px] text-gray-200 sm:text-[28px]" />
					) : (
						<RiSunFill className="text-[26px] text-yellow-400 sm:text-3xl" />
					)}
				</button>
			</div>
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
						<AiOutlinePlus className="text-2xl sm:text-4xl" />
					</button>
				</form>
				{loading && <Spinner />}
				{!loading && (
					<div>
						<ul className="mt-4 space-y-2">
							<LazyMotion features={domAnimation}>
								<AnimatePresence>
									{todos.map(todo => (
										<Todo
											key={todo.id}
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
								<span className=" text-lg font-bold text-emerald-700 dark:text-emerald-500">
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
