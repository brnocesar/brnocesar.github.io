var global = 0; /* variavel global para contar número de tarefas criadas*/

function testa_entrada(){ /* testa se a tarefa inserida é valida */

}

function criar(identidade, estado){ /* cria uma nova tarefa
    - RECEBE: número inteiro que atua como identiicador da tarefa: == 0, tarefa nova; != 0, tarefa ja existe.
    - RECEBE: string que representa o estado ("fazer", "fazendo" ou "feito") da tarefa criada,
    essa string é o id do elemento <tbody> onde será criada a tarefa, e parte do id dos novos elementos criados.
    - a tarefa criada tem a seguinte estrutura:
    <tr id=estado+"_linha_"+n>
    <td id=estado+"_celula_seletor_"+n> <input id=estado+"_check_"+n type="checkbox"> </td>
    <td id=estado+"_celula_tarefa_"+n> "tarefa" </td>
    </tr>
    - RETORNA: elemento <p> criado */

    if(!identidade){
        identidade = global++; /* se a tarefa é nova, incrementa o identificador a cada nova tarefa inserida */
    }

    var seletor = document.createElement("input"); /* cria um elemento <input> */
    seletor.setAttribute("type", "checkbox"); /* define o elemento input como checkbox */
    seletor.setAttribute("id", estado + "_check_" + String(identidade)); /* atribui o id em função do identificador global */

    var celula_seletor = document.createElement("td"); /* cria um elemento <td> (célula da tabela) para o checkbox */
    celula_seletor.setAttribute("id", estado + "_celula_seletor_" + String(identidade)); /* atribui o id em função do identificador global */ //desnescessário
    celula_seletor.appendChild(seletor); /* coloca o elemento <input> (checkbox) dentro do elemento <td> */

    var celula_tarefa = document.createElement("td"); /* cria um elemento <td> para o texto da tarefa*/
    celula_tarefa.setAttribute("id", estado + "_celula_tarefa_" + String(identidade)); /* atribui o id em função do identificador global */

    var linha = document.createElement("tr"); /* cria um elemento <tr> (linha da tabela) */
    linha.setAttribute("id", estado + "_linha_" + String(identidade)); /* atribui o id em função do identificador global */ //talvez desnescessário
    linha.appendChild(celula_seletor); /* coloca o elemento <td> (com checkbox) dentro de <tr> */
    linha.appendChild(celula_tarefa); /* coloca o elemento <td> (que irá conter o texto da tarefa) dentro de <tr> */

    var local_inserir = document.getElementById(estado); /* pega o elemento <tbody> pela id passada como argumento */
    local_inserir.appendChild(linha); /* coloca o elemento <tr> dentro (no fim) de <tbody> */
    
    return celula_tarefa; /* retorna o elemento <p> */
}

function recebe(){ /* recebe tarefa pelo campo de texto
    - recebe a tarefa pelo id do campo de input;
    - chama funcao que cria os elementos que iram conter uma tarefa;
    - coloca a tarefa nesse elemento criado*/

    var tarefa_recebida = document.getElementById("entrada_tarefa").value; /* recebe a tarefa pelo campo de input" */
    
    if(tarefa_recebida != ""){ /* garante que strings vazias não entrem como tarefas */
        var no_tarefa = document.createTextNode(tarefa_recebida); /* cria elemento nó de texto contendo a tarefa recebida */
        criar(0, "fazer").appendChild(no_tarefa); /* coloca a tarefa recebida no elemento <td> apropriado, criado e retornado pela função criar() */
    }
}

function apagar(k, estado){ /* apaga tarefa identificada pelo número k */
    var tarefa_apagada = document.getElementById(estado + "_linha_" + k);
    tarefa_apagada.parentNode.removeChild(tarefa_apagada);
}

function mudar(j, atual_estado, novo_estado){ /* muda o estado da tarefa identificada pelo número j
    - RECEBE: duas strings: estado atual ('fazer' ou 'fazendo') e futuro ('fazendo' ou 'feito'), e o número de identificação da tarefa;
    - cria nova tarefa na coluna do novo_estado, copia o conteúdo da tarefa; 
    - apaga a tarefa na coluna atual_estado */
    
    var tarefa_copiada = document.getElementById(atual_estado + "_celula_tarefa_" + j).innerText; /* copia o conteúdo da tarefa velha*/
    var no_tarefa = document.createTextNode(tarefa_copiada); /* cria elemento nó de texto com a tarefa copiada */
    criar(j, novo_estado).appendChild(no_tarefa); /* coloca a tarefa copiada na nova tarefa criada */
    apagar(j, atual_estado); /* apaga a tarefa velha */
}

function verifica_mudancas(){ /* verifica se os checkbox estão selecionados quando botão 'mudar' é clicado */
    var total_tarefas = global;

    for(var i = 0; i < total_tarefas; i++){

        /* verifica tarefas 'para fazer' */
        var identificador = "fazer_check_" + i; /* id para ser testado na coluna de tarefas 'para fazer' */
        elemento_check = document.getElementById(identificador); /* elemento <input> (checkbox) que será avaliado */
        if(Boolean(elemento_check)){ /* verifica se o elemento checkbox existe */
            var estado_check = document.getElementById(identificador).checked;
            if(estado_check){ /* verifica se o checkbox está selecionado, para executar a mudança */
                mudar(i, "fazer", "fazendo"); /* muda do estado 'para fazer' -> 'fazendo' */
            }
            continue; /* elemento de número i existe na coluna 'para fazer', então passa para i+1 */
        }

        /* verifica tarefas 'fazendo' */
        identificador = "fazendo_check_" + i; /* id para ser testado na coluna de tarefas 'fazendo' */
        elemento_check = document.getElementById(identificador); /* elemento <input> (checkbox) que será avaliado */
        if(Boolean(elemento_check)){ /* verifica se o elemento checkbox existe */
            var estado_check = document.getElementById(identificador).checked;
            if(estado_check){ /* verifica se o checkbox está selecionado, para executar a mudança */
                mudar(i, "fazendo", "feito"); /* muda do estado 'fazendo' -> 'feito' */
            }
        }
    }
}

function verifica_terminadas(){
    var total_tarefas = global;

    for(var i = 0; i < total_tarefas; i++){

        /* verifica tarefas 'para fazer' */
        var identificador = "fazer_check_" + i; /* id para ser testado na coluna de tarefas 'para fazer' */
        elemento_check = document.getElementById(identificador); /* elemento <input> (checkbox) que será avaliado */
        if(Boolean(elemento_check)){ /* verifica se o elemento checkbox existe */
            var estado_check = document.getElementById(identificador).checked;
            if(estado_check){ /* verifica se o checkbox está selecionado, para apagar */
                apagar(i, "fazer"); /* apaga a tarefa identificada pelo número i e que está na coluna 'Para Fazer' */
            }
            continue; /* elemento de número i existe na coluna 'para fazer', então passa para i+1 */
        }

        /* verifica tarefas 'fazendo' */
        identificador = "fazendo_check_" + i; /* id para ser testado na coluna de tarefas 'fazendo' */
        elemento_check = document.getElementById(identificador); /* elemento <input> (checkbox) que será avaliado */
        if(Boolean(elemento_check)){ /* verifica se o elemento checkbox existe */
            var estado_check = document.getElementById(identificador).checked;
            if(estado_check){ /* verifica se o checkbox está selecionado, para apagar */
                apagar(i, "fazendo"); /* apaga a tarefa identificada pelo número i e que está na coluna 'Fazendo' */
            }
        }

        /* verifica tarefas 'feitas' */
        identificador = "feito_check_" + i; /* id para ser testado na coluna de tarefas 'feito' */
        elemento_check = document.getElementById(identificador); /* elemento <input> (checkbox) que será avaliado */
        if(Boolean(elemento_check)){ /* verifica se o elemento checkbox existe */
            var estado_check = document.getElementById(identificador).checked;
            if(estado_check){ /* verifica se o checkbox está selecionado, para apagar */
                apagar(i, "feito"); /* apaga a tarefa identificada pelo número i e que está na coluna 'Feito' */
            }
        }
    }
}

/*
REFERÊNCIAS:
- Como criar div com javascript
https://pt.stackoverflow.com/questions/187803/como-criar-div-com-javascript
- Adentrando uma tabela HTML com Java​Script e interfaces DOM
https://developer.mozilla.org/pt-BR/docs/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
- Remover elemento da página com javascript
https://pt.stackoverflow.com/questions/4605/remover-elemento-da-p%C3%A1gina-com-javascript
*/