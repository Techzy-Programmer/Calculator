import { useRef, useState, useEffect } from "react";
import CalcContext from "./logics/CalcContext";
import Screen from "./ui-piece/Screen";
import Title from "./ui-piece/Title";
import Board from "./ui-piece/Board";
import './App.css';

/**
	* The main component of the calculator application.
	* Renders the UI of the calculator and handles user interactions.
*/

function App() {
	const calcRef = useRef<any[]>([]);
	const tempRef = useRef<string>("");
	const lastRef = useRef<string>("");
	const decRef = useRef<boolean>(false);
	const [topVal, setTopVal] = useState("");
	const [downVal, setDownVal] = useState<string>("");

	const handleKeyDown = (event: KeyboardEvent) => {
		const key = event.key;
		switch (key) {
			case "*": doCalc('X'); break;
			case 'Enter': doCalc('='); break;
			case 'Escape': doCalc("CLR"); break;
			case 'Backspace': doCalc("DEL"); break;
			default: if (event.code.startsWith("Digit")) doCalc(key); break;
			case "+": case "-": case "/": case "%": case ".": case "=": doCalc(key); break;
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	});

	const checkSpecial = (type: string): boolean =>
		type !== '.' && isNaN(parseInt(type));

	const performCalc = (l: number, m: string, r: number): number => {
		let res = 0;

		switch (m) {
			case '+': res = l + r; break;
			case '-': res = l - r; break;
			case 'X': res = l * r; break;
			case '/': res = l / r; break;
			case '%': res = (l / r) * 100; break;
		}

		return res;
	}
	
	function clearAll() {
		setTopVal("");
		setDownVal("");
		lastRef.current = "";
		tempRef.current = "";
		decRef.current = false;
		calcRef.current.length = 0;
	}
	
	function deleteLastChar() {
		tempRef.current = tempRef.current.substring(0, tempRef.current.length - 1);
		setTopVal(pval => pval.substring(0, pval.length - 1));
		setDownVal(tempRef.current);
	}

	function doCalc(type: string) {
		type = type.toUpperCase();
		const trfVal = tempRef.current;
		let tmpLen = trfVal.length;
		if (type === "DEL" && tmpLen === 0) type = "CLR";

		switch (type) {
			case "CLR": clearAll(); return;
			case "DEL": deleteLastChar(); return;
		}

		const isDec = type === '.';
		const isSpecial = checkSpecial(type);
		const wasSpecial: boolean = lastRef.current ? checkSpecial(lastRef.current) : false;
		
		// Let's perform basic checks
		if ((wasSpecial && isSpecial && lastRef.current !== "=") || (isSpecial	&&
			(lastRef.current === '.' || tmpLen === 0)) || (isDec && decRef.current)) return;
		
		// In case if user hits numeric keboard after pressing =
		if (topVal.endsWith('= ') && !isSpecial) tempRef.current = "";

		setTopVal(pVal => pVal.endsWith('= ') ? (isSpecial ? (trfVal + ` ${type} `) : type)
			: `${pVal}${isSpecial ? ` ${type} ` : type}`);
		
		lastRef.current = type;

		if (isSpecial) {
			const tempValInt = parseFloat(tempRef.current);
			calcRef.current.push(tempValInt);
			decRef.current = false;
			tempRef.current = "";
			let result = 0;

			if (calcRef.current.length === 3) {
				result = performCalc(calcRef.current[0], calcRef.current[1], calcRef.current[2]);
				result = parseInt(`${result * 10000}`) / 10000;
				calcRef.current.length = 0; // Reset Expression Array
				calcRef.current.push(result);
				setDownVal(`${result}`);
			}

			calcRef.current.push(type);

			if (type === '=') {
				calcRef.current.length = 0; // Reset Expression Array
				tempRef.current = `${result}`;
			}
		}
		else {
			if (isDec) {
				decRef.current = true;
				if (tempRef.current.length === 0)
					tempRef.current += "0";
			}
			
			tempRef.current += type;
			let leadZros = tempRef.current.replace(/^0+/, '');
			if (leadZros === "") leadZros = '0';
			tempRef.current = leadZros; //
			setDownVal(tempRef.current);
		}
	}

	return (
		<CalcContext.Provider value={{doCalc}}>
			<div id="calc">
				<Title/>
				<Screen downValue={downVal} topValue={topVal}/>
				<Board/>
			</div>
		</CalcContext.Provider>
	)
}

export default App;
