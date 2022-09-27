import React from "react";
import { m } from "framer-motion";
import { FaRegTrashAlt } from "react-icons/fa";
const classes = {
	item: `flex justify-between bg-gradient-to-r from-emerald-500 to-emerald-500/80 rounded-lg p-4 capitalize text-white`,
	itemComplete: `flex justify-between bg-slate-400 rounded-lg p-4 capitalize `,
	row: `flex justify-between gap-2 items-center cursor-pointer`,
	checkbox: `w-5 h-5 accent-slate-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-200 `,
	text: `text-xl`,
	textComplete: `text-xl line-through`,
	button: `cursor-pointer flex items-center text-white focus:outline-none focus:ring-2 focus:ring-emerald-200`,
};
const Todo = ({ todo, toggleComplete, deleteTodo }) => {
	return (
		<m.li
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{
				all: { duration: 0.3 },
			}}
			className={todo.completed ? classes.itemComplete : classes.item}
		>
			{/* <li className={todo.completed ? classes.itemComplete : classes.item}> */}
			<div className={classes.row}>
				<input
					className={classes.checkbox}
					type="checkbox"
					checked={todo.completed}
					onChange={() => toggleComplete(todo)}
				/>
				<p
					onClick={() => toggleComplete(todo)}
					className={todo.completed ? classes.textComplete : classes.text}
				>
					{todo.text}
				</p>
			</div>
			<button onClick={() => deleteTodo(todo.id)} className={classes.button}>
				<FaRegTrashAlt size={20} />
			</button>
			{/* </li> */}
		</m.li>
	);
};

export default Todo;
