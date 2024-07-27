// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBh1S9IfuLWEa3t3us47yye6NuY5DPCm8k",
    authDomain: "jpcine-b36ff.firebaseapp.com",
    databaseURL: "https://jpcine-b36ff-default-rtdb.firebaseio.com",
    projectId: "jpcine-b36ff",
    storageBucket: "jpcine-b36ff.appspot.com",
    messagingSenderId: "123637183843",
    appId: "1:123637183843:web:10b55a276c398408010f56",
    measurementId: "G-RWPZQ5G3CR"
};
firebase.initializeApp(firebaseConfig);

function carregarSeries() {
    firebase.database().ref('series').on('value', snapshot => {
        const serieLogoContainer = document.getElementById('serieLogoContainer');
        serieLogoContainer.innerHTML = '';
        snapshot.forEach(serieSnapshot => {
            const serie = serieSnapshot.val();
            const img = document.createElement('img');
            img.src = serie.logo;
            img.alt = serie.nome;
            img.onclick = () => window.location.href = `serie.html?nome=${encodeURIComponent(serie.nome)}`;
            serieLogoContainer.appendChild(img);
        });
    });
}

window.onload = carregarSeries;