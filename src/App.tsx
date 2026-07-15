import { useMemo, useState } from "react";
import "./tooltips.css";
import "./styles.css";
import { textos } from "./textos";

type Form = {
  title: string; origin: string; kind: string; perceived: string; description: string;
  process: string; workaround: string; affected: string; trend: string; actionWindow: string;
  sla: string;
};

const samples: Record<string, Form> = {
  A: { title:"Cliente não finaliza compra", origin:"Cliente", kind:"Incidente", perceived:"Alta", description:"Cliente informa que não consegue finalizar uma compra. Pode estar afetando outros clientes.", process:"interrompido", workaround:"nao-sei", affected:"1", trend:"desconhecida", actionWindow:"5", sla:"sim" },
  B: { title:"Atualização de dashboard", origin:"Área interna", kind:"Solicitação operacional", perceived:"Alta", description:"Operações solicita atualização de um dashboard usado na reunião da diretoria amanhã. Prazo hoje às 18h.", process:"dificuldade", workaround:"nao-sei", affected:"", trend:"desconhecida", actionWindow:"3", sla:"nao-sei" },
  C: { title:"Análise para nova funcionalidade", origin:"Área interna", kind:"Melhoria planejada", perceived:"Moderada", description:"Produto solicita análise de dados para avaliar uma nova funcionalidade. Sem prazo definido. Pode influenciar o roadmap do próximo trimestre.", process:"nao-afetado", workaround:"sim", affected:"1", trend:"estavel", actionWindow:"1", sla:"nao" },
  D: { title:"Aumento de lentidão", origin:"Sistema/monitoramento", kind:"Possível incidente", perceived:"Crítica", description:"Suporte identifica aumento de chamados sobre lentidão no sistema. Ainda não existe confirmação de incidente. O volume continua aumentando.", process:"dificuldade", workaround:"nao-sei", affected:"", trend:"aumentando", actionWindow:"5", sla:"nao-sei" },
};

const emptyForm: Form = {
  title:"", origin:"Cliente", kind:"Solicitação operacional", perceived:"", description:"",
  process:"", workaround:"", affected:"", trend:"desconhecida", actionWindow:"3", sla:"nao-sei",
};

const weights = { urgency:30, impact:30, risk:20, reach:10, dependencies:10 };

function points(note:number, weight:number){ return ((note-1)/4)*weight; }
function formatPoints(value:number){ return Number.isInteger(value)?String(value):value.toLocaleString("pt-BR",{maximumFractionDigits:1}); }

function HelpLabel({children,help}:{children:string;help:string}){
  return <span className="field-label">{children}<span className="help" tabIndex={0} aria-label={`${children}: ${help}`}>?<span role="tooltip">{help}</span></span></span>;
}

export default function App(){
  const [form,setForm]=useState<Form>(samples.A);
  const [analyzed,setAnalyzed]=useState(true);
  const [reviewed,setReviewed]=useState(false);
  const [view,setView]=useState<"requester"|"analyst">("requester");
  const [protocol,setProtocol]=useState("");
  const set=(key:keyof Form,value:string)=>{setForm({...form,[key]:value});setAnalyzed(false);setReviewed(false)};
  const setTriage=(value:string)=>{setForm({...form,actionWindow:value});setReviewed(false)};
  const startFreeTest=()=>{setForm({...emptyForm});setProtocol("");setAnalyzed(false);setReviewed(false);setView("requester")};

  const result=useMemo(()=>{
    const desc=form.description.toLowerCase();
    const criticalSignal = /aumento|continua aumentando|indispon|paralisa|múltipl|perda de dados|seguran/.test(desc) || form.trend==="aumentando";
    if(form.kind==="Melhoria planejada") return {route:"backlog", missing:[], criticalSignal};
    const missing:string[]=[];
    if(!form.title) missing.push("título"); if(!form.description) missing.push("descrição");
    if(!form.process) missing.push("situação do processo"); if(!form.workaround) missing.push("alternativa temporária");
    if(!form.affected) missing.push("quantidade confirmada de afetados");
    if(missing.length) return {route:criticalSignal?"triage":"return", missing, criticalSignal};
    const notes={
      urgency:Number(form.actionWindow),
      impact:form.process==="interrompido"?(Number(form.affected)>1?4:3):form.process==="parcial"?3:form.process==="dificuldade"?2:1,
      risk:criticalSignal?4:form.workaround==="nao"?3:form.workaround==="nao-sei"?2:1,
      reach:Number(form.affected)>=50?5:Number(form.affected)>=10?4:Number(form.affected)>=3?3:Number(form.affected)>=2?2:1,
      dependencies:form.process==="interrompido"?2:form.process==="parcial"?2:1,
    };
    const rows=[
      ["Urgência",notes.urgency,weights.urgency,"Janela definida pela triagem"],
      ["Impacto",notes.impact,weights.impact,`Processo ${form.process.replace("-"," ")}`],
      ["Risco",notes.risk,weights.risk,criticalSignal?"Há sinais de possível agravamento":form.workaround==="nao"?"Não existe alternativa temporária":form.workaround==="nao-sei"?"Alternativa temporária ainda não confirmada":"Existe alternativa temporária"],
      ["Abrangência",notes.reach,weights.reach,`${form.affected} afetado(s) confirmado(s)`],
      ["Dependências",notes.dependencies,weights.dependencies,"A interrupção pode impedir outras atividades. Confirmar na triagem"],
    ] as [string,number,number,string][];
    const total=Math.round(rows.reduce((sum,r)=>sum+points(r[1],r[2]),0));
    const worseningMarker=form.trend==="aumentando"?"Ocorrências em crescimento":form.trend==="oscilando"?"Ocorrências oscilando":form.trend==="estavel"?"Situação informada como estável":"Evolução ainda não verificada";
    const worseningAction=form.trend==="aumentando"?"Avalie o encaminhamento imediato.":form.trend==="oscilando"?"Acompanhe novas ocorrências.":form.trend==="estavel"?"Mantenha o acompanhamento durante o tratamento.":"Confirme se o problema está estável ou piorando.";
    return {route:"score",missing:[],criticalSignal,rows,total,worseningMarker,worseningAction};
  },[form]);

  const routeLabel=result.route==="score"?"Demanda elegível":result.route==="return"?"Devolver para complementação":result.route==="triage"?"Triagem humana imediata":"Direcionar ao backlog";

  return <main>
    <header className="topbar"><div className="brand"><span className="mark">P</span><div><b>{textos.marca.nome}</b><small>{textos.marca.assinatura}</small></div></div><span className="prototype">{textos.marca.versao}</span></header>
    <section className="hero">
      <div><p className="eyebrow">{textos.apresentacao.categoria}</p><h1>{textos.apresentacao.titulo}<br/><em>{textos.apresentacao.destaque}</em></h1><p className="lede">{textos.apresentacao.descricao}</p></div>
      <div className="principles">{textos.principios.map(item=>[<span key={`${item.numero}-numero`}>{item.numero}</span>,<p key={`${item.numero}-texto`}><b>{item.titulo}</b><br/>{item.descricao}</p>])}</div>
    </section>

    <section className="workspace">
      <div className="section-head"><div><p className="eyebrow">{textos.demonstracao.categoria}</p><h2>{textos.demonstracao.titulo}</h2></div><div className="samples">{Object.keys(samples).map(k=><button key={k} onClick={()=>{setForm(samples[k]);setAnalyzed(true);setReviewed(false);setProtocol("")}} className={form.title===samples[k].title?"active":""}>Cenário {k}</button>)}<button className="free-test" onClick={startFreeTest}>+ Teste livre</button></div></div>
      <div className="view-switch" aria-label="Alternar perfil de visualização"><button className={view==="requester"?"active":""} onClick={()=>setView("requester")}>Visão do solicitante</button><button className={view==="analyst"?"active":""} onClick={()=>setView("analyst")}>Visão da triagem</button></div>
      <div className={`grid view-${view}`}>
        <form className="panel form-panel" onSubmit={e=>{e.preventDefault();setAnalyzed(true);setProtocol(`OP-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`)}}>
          {protocol?<div className="confirmation"><span>✓</span><p className="eyebrow">SOLICITAÇÃO ENVIADA</p><h3>Recebemos sua demanda.</h3><p>Ela será analisada pela equipe responsável. Guarde o protocolo para acompanhar a operação.</p><div><small>PROTOCOLO / TICKET</small><b>{protocol}</b></div><button type="button" className="secondary" onClick={startFreeTest}>Abrir nova solicitação</button></div>:<>
          <div className="panel-title"><span>1</span><div><b>Entrada da demanda</b><small>Dados observáveis fornecidos pelo solicitante</small></div></div>
          <label><HelpLabel help="Resuma em poucas palavras o que está acontecendo. Ex.: Cliente não consegue finalizar a compra.">Título</HelpLabel><input value={form.title} onChange={e=>set("title",e.target.value)}/></label>
          <div className="cols"><label><HelpLabel help="Indique de onde veio a informação: cliente, área interna ou monitoramento do sistema.">Origem</HelpLabel><select value={form.origin} onChange={e=>set("origin",e.target.value)}><option>Cliente</option><option>Área interna</option><option>Sistema/monitoramento</option></select></label><label><HelpLabel help="Indique a natureza aparente da demanda neste primeiro registro. A triagem poderá revisar essa classificação.">Tipo percebido</HelpLabel><select value={form.kind} onChange={e=>set("kind",e.target.value)}><option>Incidente</option><option>Possível incidente</option><option>Solicitação operacional</option><option>Melhoria planejada</option></select></label></div>
          <label><HelpLabel help="Relate o ocorrido com fatos conhecidos: o que aconteceu, quando começou, onde ocorre e quais efeitos foram observados. Evite suposições.">Descrição do ocorrido</HelpLabel><textarea rows={4} value={form.description} onChange={e=>set("description",e.target.value)}/></label>
          <div className="cols"><label><HelpLabel help="Informe se ainda é possível operar e em que condição: normalmente, com dificuldade, parcialmente ou não é possível operar.">Situação do processo</HelpLabel><select value={form.process} onChange={e=>set("process",e.target.value)}><option value="">Selecione</option><option value="interrompido">Interrompido</option><option value="parcial">Parcialmente comprometido</option><option value="dificuldade">Funcionando com dificuldade</option><option value="nao-afetado">Não afetado</option></select></label><label><HelpLabel help="Existe alguma solução provisória que permita continuar a operação enquanto a demanda é tratada?">Alternativa temporária</HelpLabel><select value={form.workaround} onChange={e=>set("workaround",e.target.value)}><option value="">Selecione</option><option value="sim">Sim</option><option value="nao">Não</option><option value="nao-sei">Não sei</option></select></label></div>
          <div className="cols"><label><HelpLabel help="Informe apenas a quantidade já confirmada de pessoas, clientes ou setores afetados até o momento.">Afetados confirmados</HelpLabel><input type="number" min="0" value={form.affected} onChange={e=>set("affected",e.target.value)}/></label><label><HelpLabel help="Indique se as ocorrências estão estáveis, oscilando ou aumentando. Se não houver evidência, selecione Desconhecida.">Tendência das ocorrências</HelpLabel><select value={form.trend} onChange={e=>set("trend",e.target.value)}><option value="desconhecida">Desconhecida</option><option value="estavel">Estável</option><option value="oscilando">Oscilando</option><option value="aumentando">Aumentando</option></select></label></div>
          <label><HelpLabel help="SLA é um prazo previamente definido para responder, iniciar o atendimento ou resolver uma demanda. Ele pode estar em contrato, política interna, catálogo de serviços ou acordo entre áreas. Marque Sim somente se conhecer esse prazo; se não tiver certeza, selecione Não sei.">Existe SLA ou prazo formal para esta demanda?</HelpLabel><select value={form.sla} onChange={e=>set("sla",e.target.value)}><option value="sim">Sim</option><option value="nao">Não</option><option value="nao-sei">Não sei</option></select></label>
          <button className="primary" type="submit">Enviar solicitação <span>→</span></button>
          </>}
        </form>

        <div className="panel result-panel">
          <div className="panel-title"><span>2</span><div><b>Análise da demanda</b><small>Resultado das regras e pontos para conferência</small></div></div>
          {!analyzed?<div className="empty"><div>↻</div><b>Dados alterados</b><p>Execute uma nova análise para atualizar o resultado.</p></div>:<>
            <div className={`route ${result.route}`}><small>ENCAMINHAMENTO</small><h3>{routeLabel}</h3><p>{result.route==="score"?"Dados mínimos validados. A triagem define a Urgência antes da decisão final.":result.route==="return"?"O score não foi gerado. A demanda retorna ao solicitante.":result.route==="triage"?"Há sinais que justificam análise imediata.":"Demanda planejável, fora da fila operacional."}</p></div>
            {result.missing.length>0&&<div className="analysis-card"><b>Informações ausentes</b><ul>{result.missing.map(m=><li key={m}>{m}</li>)}</ul></div>}
            {result.route==="triage"&&<div className="ai-card"><small>SINALIZAÇÃO ASSISTIDA POR REGRAS</small><b>Possível agravamento identificado</b><p>O texto menciona aumento ou propagação. Isso não confirma incidente nem define prioridade.</p></div>}
            {result.route==="backlog"&&<div className="analysis-card"><b>Regra aplicada</b><p>A natureza planejável direciona a demanda para avaliação de backlog.</p></div>}
            {result.route==="score"&&<>
              <div className="analysis-card"><b>Definição da urgência</b><p>Informe quando o atendimento precisa começar. Essa escolha compõe a pontuação da demanda.</p><label>Prazo para iniciar o atendimento<select value={form.actionWindow} onChange={e=>setTriage(e.target.value)}><option value="5">Imediatamente</option><option value="4">Em até 1 hora</option><option value="3">No mesmo dia</option><option value="2">Em até 3 dias</option><option value="1">Fluxo regular ou backlog</option></select></label></div>
              {form.actionWindow==="5"&&<div className="urgency-rule"><small>REGRA DE AÇÃO IMEDIATA</small><b>O atendimento deve começar agora.</b><p>Urgência máxima exige início imediato, independentemente da pontuação total.</p></div>}
              <div className="scoreline"><div><span>{result.total}</span><small>/100</small><p>Score ponderado</p></div><div className="meter"><i style={{width:`${result.total}%`}}></i></div></div>
              <div className="attention-block"><small>PONTOS QUE EXIGEM CONFERÊNCIA</small><div className="attention-item"><span>SLA ou prazo formal</span><b>{form.sla==="sim"?"Prazo informado pelo solicitante":form.sla==="nao"?"Solicitante informou que não existe prazo formal":"Existência de prazo não confirmada"}</b><p>{form.sla==="sim"?"Confirme o prazo aplicável e registre o tempo restante.":form.sla==="nao"?"Verifique apenas se houver regra contratual ou interna conhecida.":"Consulte o contrato, a política interna ou o catálogo de serviços."}</p></div><div className="attention-item"><span>Evolução do problema</span><b>{result.worseningMarker}</b><p>{result.worseningAction}</p></div></div>
              <div className="criteria">{result.rows?.map(r=><div key={r[0]}><span>{r[0]}</span><b>{r[1]}/5</b><em>{formatPoints(points(r[1],r[2]))} pts</em><small>{r[3]}</small></div>)}</div>
              <div className="ai-card"><small>PONTOS PARA CONFERÊNCIA</small><b>Resultado provisório</b><p>A pontuação considera somente os dados disponíveis. Confirme risco e impacto em outras atividades antes de concluir.</p></div>
              <button className={reviewed?"reviewed":"secondary"} onClick={()=>setReviewed(!reviewed)}>{reviewed?"✓ Avaliação concluída":"Concluir avaliação"}</button>
            </>}
          </>}
        </div>
      </div>
    </section>

    <section className="case"><div><p className="eyebrow">{textos.case.categoria}</p><h2>{textos.case.tituloLinha1}<br/>{textos.case.tituloLinha2}</h2></div><div className="case-grid">{textos.case.etapas.map(etapa=><article key={etapa.numero}><span>{etapa.numero}</span><b>{etapa.titulo}</b><p>{etapa.descricao}</p></article>)}</div></section>
    <footer><p><b>{textos.rodape.titulo}</b><br/>{textos.rodape.observacao}</p><p>{textos.rodape.competencias}</p></footer>
  </main>
}
