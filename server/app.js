// importação de dependência(s)
const express = require('express');
const fs = require('fs')

// variáveis globais deste módulo
const PORT = 3000
const app = express();

let db = {}

// carregar "banco de dados" (data/jogadores.json e data/jogosPorJogador.json)
// você pode colocar o conteúdo dos arquivos json no objeto "db" logo abaixo
// dica: 1-4 linhas de código (você deve usar o módulo de filesystem (fs))

db = {
  jogadores: JSON.parse(fs.readFileSync('server/data/jogadores.json')).players,
  jogosPorJogador: JSON.parse(fs.readFileSync('server/data/jogosPorJogador.json'))
}
// configurar qual templating engine usar. Sugestão: hbs (handlebars)
//app.set('view engine', '???qual-templating-engine???');
//app.set('views', '???caminho-ate-pasta???');
// dica: 2 linhas
app.set('view engine','hbs')

app.set('views','server/views')


// EXERCÍCIO 2
// definir rota para página inicial --> renderizar a view index, usando os
// dados do banco de dados "data/jogadores.json" com a lista de jogadores
// dica: o handler desta função é bem simples - basta passar para o template
//       os dados do arquivo data/jogadores.json (~3 linhas)
app.get('/', function(req, response) {
    response.render('index',{
      jogadores: db.jogadores
    });
});


// EXERCÍCIO 3
// definir rota para página de detalhes de um jogador --> renderizar a view
// jogador, usando os dados do banco de dados "data/jogadores.json" e
// "data/jogosPorJogador.json", assim como alguns campos calculados
// dica: o handler desta função pode chegar a ter ~15 linhas de código

app.get('/jogador/:id', (req, res) => {
  const dados = db.jogadores.players.find(f => f.steamid === req.params.id);  
  
  const result = {
    steamid: dados.steamid,
    personame: dados.personaname,
    profileurl: dados.profileurl,
    avatarmedium: dados.avatarmedium,
    realname: dados.realname,
    loccountrycode: dados.loccountrycode,

  }
  
  res.render('jogador', result);
});

// EXERCÍCIO 1
// configurar para servir os arquivos estáticos da pasta "client"
// dica: 1 linha de código
app.use(express.static('client'));


// abrir servidor na porta 3000 (constante PORT)
// dica: 1-3 linhas de código
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})