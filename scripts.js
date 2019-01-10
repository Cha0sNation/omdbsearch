/*jshint ignore:start*/
document.addEventListener("DOMContentLoaded", () => {
	const apiKey = "b31b7062";
	let timerId;
	document.getElementById("searchInput").addEventListener("keyup", async function(e){
		clearTimeout(timerId);
		const input = e.target;
		const query = input.value;
		timerId = setTimeout(async function(){
			let output = document.getElementById("output");
			output.innerHTML = "";
			if(input.value !== ""){
				const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
				const data = await response.json();
				// console.log(data);
				if(data.Response == "False"){
					const div = document.createElement("div");
					div.classList.add("alert", "alert-danger");
					div.append(document.createTextNode(data.Error));
					return output.append(div);
				}
				data.Search.forEach(async function(movie){
					let id = movie.imdbID;
					let response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`);
					let data = await response.json();
					movie.Extra = data;
					output.innerHTML +=
					`
					<div class="row container movie py-2 my-2 bg-primary text-white">
						<div class="col-12 col-md-9 container">
							<h1>${movie.Title}</h1>
							<div class="container">
								<p>Year: ${movie.Extra.Released}</p>
								<p>Genre: ${movie.Extra.Genre}</p>
								<p>Rating: ${movie.Extra.Metascore}/100</p>
								<p>Runtime: ${movie.Extra.Runtime}</p>
								<p>Plot: ${movie.Extra.Plot}</p>
							</div>
						</div>
						<img src="${movie.Poster}" class="img-fluid col-12 col-md-3 rounded">
					`;
				});
			}
		}, 500);
	});
});
/*jshint ignore:end*/
