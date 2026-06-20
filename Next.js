useEffect(() => {
    const csvUrl = 'URL_CSV_GOOGLE_SHEETS_ANDA'; // GANTI DENGAN URL CSV PUBLIK ANDA

    fetch(csvUrl)
      .then(res => {
        if (!res.ok) throw new Error('Gagal mengambil data');
        return res.text();
      })
      .then(csvText => {
        console.log("Data CSV berhasil diterima"); // Cek di Inspect Element > Console
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            console.log("Hasil Parsing:", results.data); // Cek di Inspect Element > Console
            setData(results.data);
          }
        });
      })
      .catch(err => console.error("Error:", err));
  }, []);
