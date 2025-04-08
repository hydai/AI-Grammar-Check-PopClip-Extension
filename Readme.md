# LLM Grammar Check

Send the selected text to an OpenAI compatible LLM service, such as [OpenAI](https://platform.openai.com/docs/overview) or [Gaia](https://docs.gaianet.ai/getting-started/quick-start), for grammar and spell checking. 

### Configuration

#### API Endpoint

* **Running your own Gaia node:** use `http://localhost:8080/v1`
* **Public Gaia node:** it could be something like `https://0x1234.gaia.domains/v1` -- the public address of your node
  * Default LLM for all languages: [Create a Gaia node for this](https://github.com/GaiaNet-AI/node-configs/tree/main/gemma-2-9b-it)
  * Finetuned LLM for Chinese: [Create a Gaia node for this](https://github.com/GaiaNet-AI/node-configs/tree/main/qwen2.5-7b-instruct)
  * Finetuned LLM for Korean: [Create a Gaia node for this](https://github.com/GaiaNet-AI/node-configs/tree/main/exaone-3.5-7.8b-instruct)
* **OpenAI:** defaults to `https://api.openai.com/v1`

#### API Key

* **Running your own Gaia node:** you can leave this empty.
* **Public Gaia node:** https://docs.gaianet.ai/getting-started/authentication
* **OpenAI API:** https://platform.openai.com/account/api-keys

#### Model Name

* **Gaia:** you can use `default`
* **OpenAI:** default model is `gpt-4o-mini`

## About

This is an extension for [PopClip](https://pilotmoon.com/popclip/).

### Authors

Hydai, Hiraku

### Acknowledgements

Based on:

- [ChatGPT by pilotmoon](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/ChatGPT.popclipext)
- [ChatGPT Grammar Check by hirakujira](https://github.com/hirakujira/ChatGPT-Grammar-Check-PopClip-Extension)

Icons:

- "Spell Check" by [SVG Repo](https://www.svgrepo.com/).

### Requirements

Requires PopClip 2022.12 and an OpenAI Platform account.
