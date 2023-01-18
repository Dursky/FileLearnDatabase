import React, {useState, useEffect} from "react";
import ReactJson from "react-json-view";
import io from "socket.io-client";

import "./App.css";

const socket = io("http://localhost:3000");

export const App = () => {
	const [data, setData] = useState<any>({});
	const [command, setCommand] = useState<string>("");
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [lastCommand, setLastCommand] = useState<string>("");

	const handleChange = () => {
		console.log("Typed command: ", command);
		setLastCommand(command);
		socket.emit("main", command);
	};

	useEffect(() => {
		socket.on("connect", () => {
			setIsConnected(true);
		});

		socket.on("disconnect", () => {
			setIsConnected(false);
		});

		return () => {
			socket.off("connect");
			socket.off("disconnect");
			socket.off("main");
		};
	}, []);

	socket.on("main", (data) => setData(data));
	console.log(data);

	return (
		<div
			style={{
				backgroundColor: "#353535",
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}>
			<p
				style={{
					position: "absolute",
					top: 12,
					textAlign: "center",
					color: "white",
					fontWeight: "bold",
				}}>
				Database management system
			</p>
			<p
				style={{
					position: "absolute",
					right: 10,
					top: 0,
					textAlign: "right",
					color: isConnected ? "lime" : "coral",
					fontWeight: "bold",
				}}>
				{isConnected ? "Connected" : "Not Connected"}
			</p>
			<p
				style={{
					position: "absolute",
					color: "white",
					fontWeight: "bold",
					fontSize: 15,
					top: 0,
					left: "5%",
				}}>
				Last command: {lastCommand}
			</p>
			{
				<ReactJson
					theme="tube"
					style={{width: "80%", height: "80%", marginBottom: 30}}
					src={{data}}
				/>
			}
			<div style={{backgroundColor: "#91D8E4", width: "90%", height: 50, borderRadius: 20}}>
				<input
					type="text"
					style={{
						width: "100%",
						height: "100%",
						fontSize: 22,
						borderStyle: "none",
						outline: "none",
						borderRadius: 20,
					}}
					onChange={(e) => setCommand(e.target.value)}
					onKeyDown={(key) => {
						(key.key as string) === "Enter" && handleChange();
					}}></input>
				<div style={{display: "flex", justifyContent: "center"}}>
					<p
						style={{
							position: "absolute",
							textAlign: "center",
							color: "white",
							fontWeight: "bold",
						}}>
						Author: Michał Durski
					</p>
				</div>
			</div>
		</div>
	);
};

export default App;
