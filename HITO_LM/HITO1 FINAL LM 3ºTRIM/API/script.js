document.addEventListener('DOMContentLoaded', () => {
    fetch('https://www.el-tiempo.net/api/json/v2/provincias')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar la lista de provincias');
            }
            return response.json();
        })
        .then(data => {
            const selector = document.getElementById('provinceSelector');
            data.provincias.forEach(provincia => {
                const option = document.createElement('option');
                option.value = provincia.CODPROV;
                option.textContent = provincia.NOMBRE_PROVINCIA;
                selector.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar provincias:', error);
            document.getElementById('weatherContainer').textContent = 'Error al cargar la lista de provincias.';
        });
});

document.getElementById('fetchData').addEventListener('click', () => {
    const selectedProvince = document.getElementById('provinceSelector').value;
    if (!selectedProvince) {
        alert('Por favor, seleccione una provincia.');
        return;
    }
    fetch(`https://www.el-tiempo.net/api/json/v2/provincias/${selectedProvince}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudieron cargar los datos del tiempo');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('weatherContainer');
            container.innerHTML = '';
            const title = document.createElement('h2');
            title.textContent = `El tiempo en ${data.title}`;
            container.appendChild(title);

            if (!data.ciudades) {
                throw new Error('No hay datos disponibles para esta provincia');
            }

            data.ciudades.forEach(city => {
                const report = document.createElement('div');
                report.className = 'weather-report';
                let htmlContent = `<strong>${city.name}</strong>: ${city.stateSky.description}<br>
                                   Temperatura: ${city.temperaturas?.actual ?? 'No disponible'}°C 
                                   (Max: ${city.temperaturas?.max ?? 'ND'}°C, Min: ${city.temperaturas?.min ?? 'ND'}°C)`;
                if (city.humedad) {
                    htmlContent += `<br>Humedad: ${city.humedad}%`;
                }
                report.innerHTML = htmlContent;
                container.appendChild(report);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            document.getElementById('weatherContainer').textContent = 'Error al cargar los datos del tiempo.';
        });
});
