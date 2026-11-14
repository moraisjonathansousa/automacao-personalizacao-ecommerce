
# Automação de Personalização para E-commerce

## Sobre o projeto

Este projeto surgiu da identificação de uma necessidade operacional em uma loja virtual de joias em prata: simplificar o processo de personalização dos produtos e reduzir etapas manuais entre a realização do pedido e o início da produção.

Anteriormente, algumas informações necessárias para a confecção das peças precisavam ser solicitadas ao cliente após a compra. Era necessário entrar em contato, aguardar respostas, confirmar tamanhos, receber nomes, textos e fotografias. Essa dependência de comunicação manual poderia atrasar o encaminhamento dos pedidos para produção.

A proposta foi desenvolver uma solução que permitisse ao cliente informar os dados de personalização diretamente na página do produto, durante a compra.

## Funcionalidades desenvolvidas

- Seleção de dois tamanhos diferentes para pares de alianças.
- Campos para informar nomes e textos personalizados.
- Envio de fotografias diretamente pela página do produto.
- Integração com Cloudinary para hospedagem das imagens.
- Envio automático dos dados de personalização para Google Planilhas.
- Organização das informações para consulta durante a produção.

## Tecnologias utilizadas

- JavaScript
- jQuery
- HTML
- CSS
- Google Apps Script
- Google Planilhas
- Cloudinary
- Loja Integrada

## Arquitetura da solução

O projeto utiliza scripts personalizados na página dos produtos para receber as informações dos clientes.

As fotografias são enviadas ao Cloudinary, enquanto os dados de personalização são encaminhados por meio de uma integração com Google Apps Script e registrados no Google Planilhas.

## Desafios técnicos

Um dos principais desafios foi desenvolver uma solução compatível com as limitações da Loja Integrada.

Durante os testes, identifiquei que a plataforma não permitia mais a execução de scripts personalizados no checkout. Isso exigiu repensar a estratégia de integração e encontrar uma alternativa para registrar as informações sem depender de novas ações do cliente.

## Utilização de Inteligência Artificial

A Inteligência Artificial foi utilizada como ferramenta de apoio durante o desenvolvimento, auxiliando na análise de códigos, criação e ajustes de scripts, investigação de erros e identificação de alternativas técnicas.

As decisões sobre a implementação, os testes e a validação do funcionamento foram conduzidos durante o desenvolvimento do projeto.

## Aprendizados

A experiência proporcionou conhecimentos práticos em desenvolvimento web, integração de serviços, automação de processos, manipulação de dados e resolução de problemas em um ambiente real.

Mais do que implementar funcionalidades, o projeto demonstrou como a tecnologia pode ser aplicada para solucionar necessidades operacionais de um negócio.
