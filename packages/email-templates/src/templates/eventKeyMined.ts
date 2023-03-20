import handlebars from 'handlebars'
import { customContentStyle } from './helpers/customContentStyle'
import { links } from './helpers/links'
import { eventDetails } from './helpers/eventDetails'

handlebars.registerHelper('links', links)
handlebars.registerHelper('eventDetails', eventDetails)

export default {
  subject: 'A membership was added to your wallet!',
  html: `<h1>A new Membership NFT in your wallet!</h1>

<p>A new membership (#{{keyId}}) to the event <strong>{{lockName}}</strong> was just minted for you!</p>

{{#if customContent}}
<section style="${customContentStyle}">
{{{customContent}}}
  </section>
{{/if}}

<p>It has been added to your <a href="{{keychainUrl}}">Unlock Keychain</a>, where you can view it and, if needed, print it as a signed QR Code!</p>

{{links txUrl openSeaUrl true}}
{{eventDetails lockName eventDescription eventDate eventTime eventAddress}}
`,
}