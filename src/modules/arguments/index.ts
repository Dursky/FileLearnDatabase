export const argumentsList = (input: string) =>
	input
		.split("--")
		.map((i) => i.trim().replace(/--/i, ""))
		.filter((i) => i.length !== 0)
		.map((i) => {
			if (i.includes(" ")) {
				const withSemiclone = i.split(" ").map((i) => {
					//TODO: Get : or , from command

					/*
							Case 1. name:test,test:test - multiple arguments
							Case 2. name:test - single argument
						*/

					switch (i) {
						/* 
								For multiple arguments: xxx:yyy,yyy:xxx 
							*/
						case ",":
							return i.split(",").map((k) => ({[k.split(":")[0]]: k.split(":")[1]}));

						/*
								For single argument: xxx:yyy
							*/
						case ":":
							return {[i.split(":")[0]]: i.split(":")[1]};

						/*
								If not found arguments - just return the same data
							*/
						default:
							return i;
					}
				});

				return withSemiclone;
			}
			return [i];
		});
