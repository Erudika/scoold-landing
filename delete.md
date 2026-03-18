1. Note: Warn:
2. Steps
3. File tab <COde/>
4. Flow diag?
5. Pro badge


GO BACK TO INSTALLATION AND BASIC CONFIG TO LINK TO NEXT STEPS


IMPROVE!
----------
> For all identity providers, you must whitelist the Para host with the appropriate authentication endpoint:
> - Google: `https://paraio.com/google_auth`
> - Facebook: `https://paraio.com/facebook_auth`
> - OAuth 2: `https://paraio.com/oauth2_auth`
> Learn more about [custom authentication](http://paraio.org/docs/#029-passwordless)






## Content-Security-Policy header

This header is enabled by default for enhanced security. It can be disabled with `scoold.csp_header_enabled = false`.
The default value is modified through `scoold.csp_header = "new_value"`. The default CSP header is:
```ini
default-src 'self';
base-uri 'self';
connect-src 'self' scoold.com www.google-analytics.com www.googletagmanager.com accounts.google.com;
frame-src 'self' accounts.google.com staticxx.facebook.com;
font-src cdnjs.cloudflare.com fonts.gstatic.com fonts.googleapis.com;
style-src 'self' 'unsafe-inline' fonts.googleapis.com cdnjs.cloudflare.com static.scoold.com accounts.google.com;
img-src 'self' https: data:;
object-src 'none;
report-uri /reports/cspv;
script-src 'unsafe-inline' https: 'nonce-{{nonce}}' 'strict-dynamic';
```

The placeholder `{{nonce}}` will get replaced by the CSP nonce value used for whitelisting scripts.

**Note:** If you get CSP violation errors, check your `scoold.host_url` and `scoold.cdn_url` configuration,
or edit the value of `scoold.csp_header`.

Additionally, there are 4 options to extend the values of `connect-src`, `frame-src`, `font-src` and `style-src`
respectively:
```ini
scoold.csp_connect_sources = "connect-domain1.com connect-domain2.com"
scoold.csp_frame_sources = "frame-domain1.com frame-domain2.com"
scoold.csp_font_sources = "font-domain1.com font-domain2.com"
scoold.csp_style_sources = "style-domain1.com style-domain2.com"
```

You can also enable or disable CSP violation reports (visible only to admins) by setting `scoold.csp_reports_enabled = true`.
Keep in mind that if your website has a lot of traffic, this will result in hundreds of new reports being created each hour.

## External scripts and JS snippets

You can append external scripts and JS snippets to the end of the page by setting the `scoold.external_scripts` property.
Scripts are loaded in alphabetical order based on their key.
```ini
# URL
scoold.external_scripts.myscript1 = "https://mydomain.com/script.js"
# Base64 encoded long JavaScript snippet
scoold.external_scripts.myscript2 = "J2Y2M3VlcH .... enZ2OScpOw=="
# Short raw JS snippet
scoold.external_scripts.myscript3 = "var x = 5; console.log('x is', x);"
```

**Important:** Watch out for console errors in the browser after you add external scripts. In such cases you might have to
modify the `frame-src` or `connect-src` portions of the CSP header (see the 4 options above).

If 3rd party cookie consent is enabled (for GDPR, CCPA), all external scripts will be disabled until the user gives their
consent. You can bypass that by prefixing its key with "bypassconsent", e.g. `scoold.external_scripts.bypassconsent_myscript2`.

Additionally, you can put scripts in the `<head>` element by prefixing their name with "head", for example:
`scoold.external_scripts.head_script`.

## External CSS stylesheets

You can inline short snippets of CSS using `scoold.inline_css`. Keep in mind that any inlined CSS rules **will
override** any of the previously declared stylesheets, including the main stylesheet rules.

```ini
scoold.inline_css = "body { color: #abcdef; }"
```
Another option is to add external stylesheets to the website:
```ini
scoold.external_styles = "https://mydomain.com/style1.css, https://mydomain.com/style2.css"
```
The last option is to completely replace the main stylesheet with a custom one. It's a good idea to copy the default
CSS rules from [`/styles/style.css`](https://demo.scoold.com.com/styles/style.css) and modify those, then upload the new
custom stylesheet file to a public location and set:

```ini
scoold.stylesheet_url = "https://public.cdn.com/custom.css"
```

The order in which CSS rules are loaded is this (each overrides the previous ones):
1. main stylesheet, 2. external stylesheets, 3. inline CSS or custom theme

You can also override the default dark stylesheet which is only loaded if dark mode is enabled:

```ini
scoold.dark_stylesheet_url = "https://public.cdn.com/dark.css"
```

## Serving static files from local disk

By default, Scoold will only serve static files from the `/static` folder on the classpath (inside the JAR).
If you want to configure it to serve additional resources from a local directory, set this system property:
```ini
spring.web.resources.static-locations = "classpath:/static/, file:/home/scoold/static-folder/"
```
Then, for example, a file located at `/home/scoold/static-folder/file.png` will be served from `localhost:8000/file.png`.
For more information, check the
[Spring Boot documentation](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#web.servlet.spring-mvc.static-content).

## Serving static files from a CDN

Scoold will serve static files (JS, CSS, fonts) from the same domain where it is deployed. You can configure the
`scoold.cdn_url` to enable serving those files from a CDN. The value of the CDN URL *must not* end in "/".



## reCAPTCHA support

You can protect signups and password reset functionality with reCAPTCHA v3. First, you will need to register a new domain
at [Google reCAPTCHA](https://www.google.com/recaptcha/admin). Create a new reCAPTCHA v3, add your site to the whitelist
and copy the two keys - a clientside key (site key) and a serverside key (secret). Then, protect the pages
`/signin/register` and `/signin/iforgot` by adding these properties to your configuration:
```ini
scoold.signup_captcha_site_key = "site-key-from-google"
scoold.signup_captcha_secret_key = "secret-from-google"
```

## Delete protection for valuable content

By default, Scoold will protect valuable questions and answers from accidental deletion. If a question has at least one
answer, the author of that question will not be able to delete it. Or, if an answer is accepted by the author of the
question, the person who wrote the answer won't be able to delete it. You can turn this off with:
```ini
scoold.delete_protection_enabled = false
```


## Social login

For all social identity providers, you need to obtain both the OAuth2 client ID (app `id`) and secret key.
**Note:** if the credentials are blank, the sign in button is hidden for that provider.
```ini
# Facebook
scoold.fb_app_id = ""
scoold.fb_secret = ""
# Google
scoold.gp_app_id = ""
scoold.gp_secret = ""
# GitHub
scoold.gh_app_id = ""
scoold.gh_secret = ""
# LinkedIn
scoold.in_app_id = ""
scoold.in_secret = ""
# Twitter
scoold.tw_app_id = ""
scoold.tw_secret = ""
# Microsoft
scoold.ms_app_id = ""
scoold.ms_secret = ""
scoold.ms_tenant_id = ""
# Slack
scoold.sl_app_id = ""
scoold.sl_secret = ""
# Amazon
scoold.az_app_id = ""
scoold.az_secret = ""
```
You also need to set your host URL when running Scoold in production:
```ini
scoold.host_url = "https://your.scoold.url"
```
This is required for authentication requests to be redirected back to the origin.

**Important:** You must whitelist the [Para endpoints](https://paraio.org/docs/#031-github) in the admin consoles of
each authentication provider. For example, for GitHub you need to whitelist `https://parahost.com/github_auth` as a
callback URL (redirect URL). The same thing applies for the other providers. For these two providers you need to whitelist
these two URLs, containing the public address of Scoold:
```
https://myscoold.com
https://myscoold.com/signin
```
For locally hosted authentication providers (SAML, LDAP, Mattermost, etc.) the authentication endpoints will also be
pointing to the URL of your Scoold server.

**If you skip this step, authentication will most likely not work.**

In some cases ([see related issue](https://github.com/Erudika/scoold/issues/199)) you want to have Scoold connect to
Para which is hosted somewhere on your local network and logging in with some authentication providers, like Microsoft,
doesn't work. In such cases, you would see an error "redirect_uri mismatch" or "invalid redirect_uri - must start with
https:// or http://localhost". To make it work you can set `scoold.security.redirect_uri = "https://public-para.host"`
while still keeping `scoold.para_endpoint = "http://local-ip:8080"`.

## OAuth 2.0 login

You can authenticate users against any OAuth 2.0/OpenID Connect server through the generic OAuth 2 filter in Para.
Make sure you **whitelist** your Para authentication endpoint `https://para_url/oauth2_auth` as a trusted redirect URL.

Here are all the options which you can set in the Scoold configuration file:
```ini
# minimal setup
scoold.oa2_app_id = ""
scoold.oa2_secret = ""
scoold.security.oauth.authz_url = "https://your-idp.com/login"
scoold.security.oauth.token_url = "https://your-idp.com/token"
scoold.security.oauth.profile_url = "https://your-idp.com/userinfo"
scoold.security.oauth.scope = "openid email profile"

# extra options
scoold.security.oauth.accept_header = ""
scoold.security.oauth.domain = "paraio.com"
scoold.security.oauth.parameters.id = "sub"
scoold.security.oauth.parameters.picture = "picture"
scoold.security.oauth.parameters.email = "email"
scoold.security.oauth.parameters.name = "name"
scoold.security.oauth.parameters.given_name = "given_name"
scoold.security.oauth.parameters.family_name = "family_name"

# Sets the string on the login button
scoold.security.oauth.provider = "Continue with OpenID Connect"

# [PRO] Enable/disable access token delegation
scoold.security.oauth.token_delegation_enabled = false

# [PRO] Assigns spaces to each user from the OAuth2 claim 'spaces'
scoold.security.oauth.spaces_attribute_name = "spaces"

# [PRO] Assigns moderator/admin roles from the OAuth2 claim 'roles'
scoold.security.oauth.groups_attribute_name = "roles"
scoold.security.oauth.mods_equivalent_claim_value = "mod"
scoold.security.oauth.admins_equivalent_claim_value = "admin"
# if specified, users who are not admin/mod will be denied access when not members of group
scoold.security.oauth.users_equivalent_claim_value = ""

# Enable/disable avatar fetching from IDP
scoold.security.oauth.download_avatars = false

# State parameter in auth requests can be disabled if problematic
scoold.security.oauth.state_param_enabled = true
```

### Access token delegation

**PRO** This is an additional security feature, where the access token from the identity provider (IDP)
is stored in the user's `idpAccessToken` field and validated on each authentication request with the IDP. If the IDP
revokes a delegated access token, then that user would automatically be logged out from Scoold Pro and denied access
immediately.

### Advanced attribute mapping

The basic profile data attributes (name, email, etc.) can be extracted from a complex response payload that is returned
from the identity provider's `userinfo` endpoint. You can use JSON pointer syntax to locate attribute values within a
more complex JSON payload like this one:
```
{
    "sub": "gfreeman",
    "attributes": {
        "DisplayName": "Gordon Freeman",
        "DN": "uid=gordon,CN=Users,O=BlackMesa",
        "Email": "gordon.freeman@blackmesa.gov"
    }
}
```
The corresponding configuration to extract the name and email address would be:
```ini
scoold.security.oauth.parameters.email = "/attributes/Email"
scoold.security.oauth.parameters.name = "/attributes/DisplayName"
```

### Advanced roles mapping

**PRO** This feature requires token delegation to be enabled with `scoold.security.oauth.token_delegation_enabled = true`.
When working with complex user profile payloads coming from the ID provider, you can specify the exact property
name where the roles data is contained. For example, having a JSON user profile response like this:
```
{
    "sub": "gfreeman",
    "DisplayName": "Gordon Freeman",
    "Roles": "Staff,Admins,TopSecret",
    "attributes": {
        "MemberOf": [
            "CN=Admins,CN=Lab,O=BlackMesa"
        ]
    }
}
```
we can map that user to the Scoold admins group with this configuration:
```ini
scoold.security.oauth.groups_attribute_name = "Roles"
scoold.security.oauth.admins_equivalent_claim_value = ".*?Admins.*"
```
Regular expressions are supported for searching within the roles attribute value. JSON pointers can also be used here
like so:
```ini
scoold.security.oauth.groups_attribute_name = "/attributes/MemberOf"
scoold.security.oauth.admins_equivalent_claim_value = "^CN=Admins.*"
```
Additionally, when assigning roles from OAuth2 claims, you can explicitly specify a subset of allowed users who can access
Scoold by setting `scoold.security.oauth.users_equivalent_claim_value`. For example, if the value of that is set
to `"scoold_user"`, and a user having the claim of `"roles": ["sales_rep"]` tries to login, they will be denied access.
By default, all OAuth2 users are allowed to log into Scoold.

### Additional custom OAuth 2.0 providers
You can add two additional custom OAuth 2.0/OpenID connect providers called "second" and "third". Here's what the settings
look like for the "second" provider:

```ini
# minimal setup (second provider)
scoold.oa2second_app_id = ""
scoold.oa2second_secret = ""
scoold.security.oauthsecond.authz_url = "https://your-idp.com/login"
scoold.security.oauthsecond.token_url = "https://your-idp.com/token"
scoold.security.oauthsecond.profile_url = "https://your-idp.com/userinfo"
scoold.security.oauthsecond.scope = "openid email profile"

# extra options (second provider)
scoold.security.oauthsecond.accept_header = ""
scoold.security.oauthsecond.domain = "paraio.com"
scoold.security.oauthsecond.parameters.id = "sub"
scoold.security.oauthsecond.parameters.picture = "picture"
scoold.security.oauthsecond.parameters.email = "email"
scoold.security.oauthsecond.parameters.name = "name"
scoold.security.oauthsecond.parameters.given_name = "given_name"
scoold.security.oauthsecond.parameters.family_name = "family_name"

# Sets the string on the login button (second provider)
scoold.security.oauthsecond.provider = "Continue with Second OAuth 2.0 provider"

# Enable/disable access token delegation (second provider)
scoold.security.oauthsecond.token_delegation_enabled = false
```

For the "third" OAuth 2.0 provider it's the same configuration but replace "second" with "third".

**Note:** If Para and Scoold are hosted both on the same server and your Para instance is not publicly accessible from
the Internet, you need to expose `localhost:8080/oauth2_auth` by configuring a proxy server to forward
`yourdomain/oauth2_auth` requests to `localhost:8080/oauth2_auth`. If Para is publicly accessible this step is not necessary.

### Sign in with Okta

This is an example guide for configuring Scoold to work with an authentication provider like Okta. The steps are similar
for other providers, such as Auth0.

1. Create a new client application (OAuth 2 client)
   - Add `http://para-host:8080/oauth2_auth` as a login redirect URI
   - Use the "Authorization Code" flow
   - Select	that you want **client credentials**
2. Copy the client credentials (client id, secret) to your Scoold `scoold-application.conf` file:
	```ini
	scoold.oa2_app_id = "0oa123...."
	scoold.oa2_secret = "secret"
	scoold.security.oauth.authz_url = "https://${yourOktaDomain}/oauth2/v1/authorize"
	scoold.security.oauth.token_url = "https://${yourOktaDomain}/oauth2/v1/token"
	scoold.security.oauth.profile_url = "https://${yourOktaDomain}/oauth2/v1/userinfo"
	scoold.security.oauth.scope = "openid email profile"
	scoold.security.oauth.provider = "Continue with Okta"
	```
Make sure to replace `${yourOktaDomain}` with your actual Okta domain name.

3. Restart Scoold and login with an Okta user account

### Sign in with Azure Active Directory (AAD)

This is an example guide for configuring Scoold to use Azure Active Directory (aka Microsoft Identity Platform)
as its authentication provider. The steps are similar to other OAuth2.0 identity providers setup.

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your *Azure Acive Directory* tenant
3. Go to *App registrations* (in the left sidebar, under *Manage* section)
4. Choose *New registration*
5. Put the name of the new app, and select supported account types (accoding to your requirements)
6. Provide the *Redirect URI* - it needs to point to Para's `/oauth2_auth` endpoint (make sure that
   this URL is accessible from your users' devices). For development purposes, `http://localhost:8080/oauth2_auth`
   is probably sufficient.
7. Click *Register*.
8. Copy the *Application (client) ID* that you should be seeing now at the top - it is the value for `scoold.oa2_app_id`
   setting in your configuration.
9. Navigate to *Certificates and Secrets* in the sidebar on the left.
10. Create a new secret by clicking on *New client secret*.
11. Copy the generated secret (you will not be able to see that secret anymore on Azure Portal) - it is the value
    for `scoold.oa2_secret` setting in your configuration.
12. Fill in the configuration of Scoold:

	```ini
	scoold.oa2_app_id = "e538..."
	scoold.oa2_secret = "secret"
	scoold.security.oauth.authz_url = "https://login.microsoftonline.com/${yourAADTenantId}/oauth2/v2.0/authorize"
	scoold.security.oauth.token_url = "https://login.microsoftonline.com/${yourAADTenantId}/oauth2/v2.0/token"
	scoold.security.oauth.profile_url = "https://graph.microsoft.com/oidc/userinfo"
	scoold.security.oauth.scope = "openid email profile"
	scoold.security.oauth.provider = "Continue with AAD"
	```

Make sure to replace `${yourAADTenantId}` with your actual AAD tenant ID.

13. Restart Scoold and login with an AAD user account

## LDAP configuration

LDAP authentication is initiated with a request like this `POST /signin?provider=ldap&access_token=username:password`.
There are several configuration options which Para needs in order to connect to your LDAP server. These are the defaults:

```ini
# minimal setup
scoold.security.ldap.server_url = "ldap://localhost:8389/"
scoold.security.ldap.base_dn = "dc=springframework,dc=org"
scoold.security.ldap.user_dn_pattern = "uid={0}"
# add this ONLY if you are connecting to Active Directory
scoold.security.ldap.active_directory_domain = ""

# extra options - change only if necessary
scoold.security.ldap.user_search_base = ""
scoold.security.ldap.user_search_filter = "(cn={0})"
scoold.security.ldap.password_attribute = "userPassword"
scoold.security.ldap.username_as_name = false

# Sets the string on the login button (PRO)
scoold.security.ldap.provider = "Continue with LDAP"

# automatic groups mapping
scoold.security.ldap.mods_group_node = ""
scoold.security.ldap.admins_group_node = ""
```

The search filter syntax allows you to use the placeholder `{0}` which gets replaced with the person's username.

You can also map LDAP DN nodes to Para user groups. For example, with the following configuration:
```
scoold.security.ldap.mods_group_node = "ou=Moderators"
scoold.security.ldap.admins_group_node = "cn=Admins"
```
LDAP users with a DN `uid=Gordon,ou=Moderators,dc=domain,dc=org` will automatically become part of the `mods` group,
i.e. `groups: "mods"`. Similarly, if their DN contains `cn=Admins` they will become administrators, i.e. `groups: "admins"`.

### Active Directory LDAP

To enable authentication with an **Active Directory** LDAP server, set `scoold.security.ldap.ad_mode_enabled = true`.
In this mode, the search filter defaults to `(&(objectClass=user)(userPrincipalName={0}))`.
An alternative search filter would be `(&(objectClass=user)(sAMAccountName={1}))`. Keep in mind that the domain you
put in the configuration is actually the UPN suffix which gets appended to the username as `username@domain.com` if
the supplied login username doesn't end with a domain. The domain has nothing to do with the AD domain or the location
of the AD server.

The only valid configuration properties for AD are:
`user_search_filter`, `base_dn`, `server_url` and `active_directory_domain` - everything else is ignored so don't put
it in the config file at all!

Here's a working LDAP configuration for AD:
```ini
scoold.security.ldap.ad_mode_enabled = true
scoold.security.ldap.user_search_filter = "(&(objectClass=user)(sAMAccountName={1}))"
scoold.security.ldap.base_dn = "ou=dev,dc=scoold,dc=com"
scoold.security.ldap.server_url = "ldap://192.168.123.70:389"
scoold.security.ldap.active_directory_domain = "scoold.com"
```

For the above configuration the following logins should work, given that a user `joe` exists:
- `joe@scoold.com` + password
- `joe@some-other-domain.com` + password
- `joe` + password

As you can see the domain part is actually ignored because it is irrelevant. You cannot bind an AD user with their email.
You can bind them based on their `username` a.k.a. `sAMAccountName`. If the user has an email address where the alias is
the same as the `sAMAccountName` but the domain is different, then the login will succeed. If the user above has an email
`joe.smith@gmail.com` then the login with that email will fail because a bind is not possible,
and the LDAP search request will return no results.

The syntax for the search filter allows you to use the placeholders `{0}` (replaced with `username@domain`) and `{1}`
(replaced with `username` only).

Here's an example **Active Directory** configuration (note that any other settings than the ones below will be ignored):
```ini
scoold.security.ldap.server_url = "ldap://server:389"
scoold.security.ldap.active_directory_domain = "domain.com"
scoold.security.ldap.user_search_filter = "userPrincipalName={0}"
scoold.security.ldap.base_dn = "ou=dev,dc=domain,dc=com"
```

### FreeIPA LDAP

Scoold supports authentication with a FreeIPA server over LDAP. Here's a sample configuration for the free demo instance
provided by FreeIPA - [ipa.demo1.freeipa.org](https://ipa.demo1.freeipa.org):

```ini
scoold.security.ldap.server_url = "ldap://ipa.demo1.freeipa.org:389"
scoold.security.ldap.base_dn = "cn=users,cn=accounts,dc=demo1,dc=freeipa,dc=org"
scoold.security.ldap.user_dn_pattern = "uid={0}"
```
To test this, try logging in with user `manager` and password `Secret123`.

To print out debug information about LDAP requests, start Para with `-Dlogging.level.org.springframework.ldap=DEBUG`.

To learn more about the settings above, read the [LDAP docs for Para](https://paraio.org/docs/#030-ldap).

## SAML configuration

**PRO**
First, you have to setup Para as a SAML service provider using the config below. Then you can exchange SAML metadata with
your SAML identity provider (IDP). The SP metadata endpoint is `/saml_metadata/{appid}`. For example, if your Para
endpoint is `paraio.com` and your `appid` is `scoold`, then the metadata is available at
`https://paraio.com/saml_metadata/scoold`.

SAML authentication is initiated by sending users to the Para SAML authentication endpoint `/saml_auth/{appid}`.
For example, if your Para endpoint is `paraio.com` and your `appid` is `scoold`, then the user should be sent to
`https://paraio.com/saml_auth/scoold`. Para (the service provider) will handle the request and redirect to the SAML IDP.
Finally, upon successful authentication, the user is redirected back to `https://paraio.com/saml_auth/scoold` which is
also the assertion consumer service (ACS).

**Note:** The X509 certificate and private key must be encoded as Base64 in the configuration file. Additionally,
the private key must be in the **PKCS#8 format** (`---BEGIN PRIVATE KEY---`). To convert from PKCS#1 to PKCS#8, use this:
```
openssl pkcs8 -topk8 -inform pem -nocrypt -in sp.rsa_key -outform pem -out sp.pem
```
For simplicity, you can generate the certificates for SAML by executing the Bash script `gencerts.sh`,
located in this repository:
```
./gencerts.sh localhost secret
```
Then, simply Base64-encode the contents of the public key `localhost.pem` and private key `localhost.key`:
```
base64 localhost.key > localhost_saml_base64.key
base64 localhost.pem > localhost_saml_base64.pem
```

There are lots of configuration options but Para needs only a few of those in order to successfully
authenticate with your SAML IDP (listed in the first rows below).

```ini
# minimal setup
# IDP metadata URL, e.g. https://idphost/idp/shibboleth
scoold.security.saml.idp.metadata_url = ""

# SP endpoint, e.g. https://paraio.com/saml_auth/scoold
scoold.security.saml.sp.entityid = ""

# SP public key as Base64(x509 certificate)
scoold.security.saml.sp.x509cert = ""

# SP private key as Base64(PKCS#8 key)
scoold.security.saml.sp.privatekey = ""

# attribute mappings (usually required)
# e.g. urn:oid:0.9.2342.19200300.100.1.1
scoold.security.saml.attributes.id = ""
# e.g. urn:oid:0.9.2342.19200300.100.1.3
scoold.security.saml.attributes.email = ""
# e.g. urn:oid:2.5.4.3
scoold.security.saml.attributes.name = ""


# extra options (optional)
# this is usually the same as the "EntityId"
scoold.security.saml.sp.assertion_consumer_service.url = ""
scoold.security.saml.sp.nameidformat = ""

# IDP metadata is usually automatically fetched
scoold.security.saml.idp.entityid = ""
scoold.security.saml.idp.single_sign_on_service.url = ""
scoold.security.saml.idp.x509cert = ""

scoold.security.saml.security.authnrequest_signed = false
scoold.security.saml.security.want_messages_signed = false
scoold.security.saml.security.want_assertions_signed = false
scoold.security.saml.security.want_assertions_encrypted = false
scoold.security.saml.security.want_nameid_encrypted = false
scoold.security.saml.security.sign_metadata = false
scoold.security.saml.security.want_xml_validation = true
scoold.security.saml.security.signature_algorithm = ""

scoold.security.saml.attributes.firstname = ""
scoold.security.saml.attributes.picture = ""
scoold.security.saml.attributes.lastname = ""
scoold.security.saml.domain = "paraio.com"

# Sets the string on the login button
scoold.security.saml.provider = "Continue with SAML"
```

## Custom authentication (Single Sign-on)

**PRO** Para supports custom authentication providers through its "passwordless" filter. This means that you can send any
user info to Para and it will authenticate that user automatically without passwords. The only verification done here is
on this secret key value which you provide in your Scoold Pro configuration file:
```ini
scoold.app_secret_key = "change_to_long_random_string"
```
This key is used to protect requests to the passwordless filter and it's different from the Para secret key for your app.
Here's the basic authentication flow:

1. A user wants to sign in to Scoold Pro and clicks a button
2. The button redirects the user to a remote login page you or your company set up.
3. The user enters their credentials and logs in.
4. If the credentials are valid, you send back a special JSON Web Token (JWT) to Scoold with the user's basic information.
5. Scoold verifies the token and the user is signed in to Scoold

The JWT must contain the following claims:

- `email` - user's email address
- `name` - user's display name
- `identifier` - a unique user id in the format `custom:123`
- `appid` - the app id (optional)

The JWT is signed with the value of `scoold.app_secret_key` and should have a short validity period (e.g. 10 min).
The JWT should also contain the claims `iat` and `exp` and, optionally, `nbf`. Supported signature algorithms for the JWT
are `HS256`, `HS384` or `HS512`.
Once you generate the JWT on your backend (step 4 above), redirect the successful login request back to Scoold:
```
GET https://scoold-host/signin/success?jwt=eyJhbGciOiJIUzI1NiI..&passwordless=true
```

The UI button initiating the authentication flow above can be customized like this:
```ini
scoold.security.custom.provider = "Continue with Acme Co."
# location of your company's login page
scoold.security.custom.login_url = ""
```

There's an [example login page](https://albogdano.github.io/scoold-login-page/) implementing this sort of authentication.

## Login and logout redirects

You can configure Scoold to redirect users straight to the identity provider when they click the "Sign in" button.
This feature is disabled by default:
```ini
scoold.redirect_signin_to_idp = false
```
This works only for social login identity providers and SAML. It won't work for LDAP or
basic password authentication. When enabled and combined with `scoold.is_default_space_public = false`,
unauthenticated users will be sent directly to the IDP without seeing the "Sign in" page or any other page on Scoold.

You can also configure users to be redirected to an external location when they log out:
```ini
scoold.signout_url = "https://homepage.com"
```

## SCIM 2.0 support

**PRO** Scoold Pro has a dedicated SCIM API endpoint for automatic user provisioning at `http://localhost:8000/scim`.
This allows you to manage Scoold Pro users externally, on an identity management platform of your choice.
Here's an example configuration for enabling SCIM in Scoold:

```ini
scoold.scim_enabled = true
scoold.scim_secret_token = "secret"
scoold.scim_map_groups_to_spaces = true
scoold.scim_allow_provisioned_users_only = false
```
By default, Scoold Pro will create a space for each SCIM `Group` it receives from your identity platform and assign the
members of that group to the corresponding space. Just make sure that groups are pushed from your IdM platform to Scoold.

If `scoold.scim_allow_provisioned_users_only = true`, user accounts which have not been SCIM-provisioned will be blocked
even if those users are members of your identity pool. This allows system administrators to provision a subset of the
user pool in Scoold.

**Important:** When users are provisioned from a SCIM client (Azure AD, Okta, OneLogin, etc.) ensure that the SCIM
`userName` attribute is unique. This means that when a SCIM client sends an update to Scoold Pro,
the user will be matched based on their `userName`.

You can also map groups from your identity pool to Para user groups. For example:
```ini
scoold.security.scim.mods_group_equivalent_to = "Moderators"
scoold.security.scim.admins_group_equivalent_to = "Administrators"
```

## Spaces (a.k.a. Teams)

Spaces are a way to organize users and questions into isolated groups. There's a default space, which is publicly
accessible by default. Each user can belong to one or more spaces, but a question can only belong to a single space.
Permission to access a space is given by an administrator. You can bulk edit users' spaces and also move a question to a
different space.

By default there's a public "default" space where all questions go. When you create a new space and assign users to it
they will still see all the other questions when they switch to the "default" space. To make the default space private
set `scoold.is_default_space_public = false`.

**PRO** In Scoold Pro, you can create as many space as you need. The open source version is limited to 10 spaces. Also
in PRO you can automatically assign multiple spaces to new users, whereas in the OSS version you can only assign one.

If you want to assign space(s) to new users automatically, add this to your configuration:
```ini
# put space ids here, the "scooldspace:" prefix is optional
scoold.auto_assign_spaces = "my-space-one,my-other-space"
```
You can assign both the default space and a custom space to new users (values can contain spaces):
```ini
scoold.auto_assign_spaces = "default,My Custom Space"
```
When using the option above, new spaces are added to existing spaces for each user. You can configure auto-assigned
spaces to overwrite the existing user spaces (like the "default" space, assigned to everyone) by setting:
```ini
scoold.reset_spaces_on_new_assignment = true
```
So when you have that set to `false` and you have configured Scoold to assign custom spaces to new users
(e.g. "my-space-1" and "my-space-2"), those users will become members of  "my-space-1", "my-space-2" **and** the
default space. If the value is `true`, the default space gets overwritten by the custom spaces you have specified in
`scoold.auto_assign_spaces` and new users will only be members of "my-space-1" and "my-space-2".

This is turned on for all users authenticated with LDAP, SAML or OAuth 2.0.

Alternatively, Scoold Pro can have spaces and roles delegated to users from an OpenID Connect/OAuth 2.0 identity provider.
You have to enable access token delegation with `scoold.security.oauth.token_delegation_enabled = true` and Scoold Pro will
try to obtain spaces from a custom attribute like `spaces`. Such custom attributes can be configured in the IDP and
pushed to clients (Scoold Pro) embedded in access tokens. If you want to change the name of the custom attribute supplied
by your IDP, set `scoold.security.oauth.spaces_attribute_name`, which by default is equal to `spaces`. The value of that
attribute should contain comma-separated list of spaces. If the spaces pushed from the IDP do not exist, Scoold will
create them for you.

There are two ways to assign moderators to spaces - a user can be promoted to moderator and be allowed to access all spaces,
or, every space can have an individually assigned moderator. The option that controls this operation is:
```
# when false, mods are manually assigned per each space
scoold.mods_access_all_spaces = true
```
When the above is set to `false`, administrators can go to the profile page of a user and make them a moderator in the
spaces they choose. For all other spaces, the user in question will be a regular user.
Only administrators can promote users to moderators, no matter how the option above is configured.

## Webhooks

Webhooks are enabled by default in Scoold. To disable this functionality set `scoold.webhooks_enabled = false`. If you
are self-hosting Para, you need to also enable webhooks there using the same configuration option.
You can add or remove webhooks in the "Administration" page. Webhooks can also be disabled and they will be
disabled automatically when the target URL doesn't respond to requests from Para.

Para will notify your target URL with a `POST` request containing the payload and a `X-Webhook-Signature` header. This
header should be verified by the receiving party by computing `Base64(HmacSHA256(payload, secret))`.

The standard events emitted by Scoold are:

- `question.create` - whenever a new question is created
- `question.close` - whenever a question is closed
- `question.view` - whenever a question is viewed by anyone
- `question.approve` - whenever a question is approved by moderator
- `answer.create` - whenever a new answer is created
- `answer.accept` - whenever an answer is accepted
- `answer.approve` - whenever an answer is approved by moderator
- `report.create` - whenever a new report is created
- `comment.create` - whenever a new comment is created
- `user.signin` - whenever a user signs in to the system
- `user.signup` - whenever a new user is created
- `user.search` - whenever a user performs a search
- `revision.restore` - whenever a revision is restored
- `user.ban` -  <kbd>Pro</kbd> whenever a user is banned
- `user.mention` -  <kbd>Pro</kbd> whenever a user is mentioned
- `question.like` - <kbd>Pro</kbd> whenever a question is favorited

The event playloads for events `user.signin`, `question.view` and `user.search` contain extra information about the
client which made the original request, e.g. IP address, `User-Agent` and `Referrer` headers.

In addition to the standard event, Para also sends webhooks to the following core (CRUD) events, for all object types:
`create`, `update`, `delete`, `createAll`, `updateAll`, `deleteAll`.

You can subscribe to any of these custom events in Scoold using the REST API like so:
```POST /api/webhooks
{
  "targetUrl": "https://myurl",
  "typeFilter": "revision",
  "urlEncoded": false,
  "create": true,
  "update": false,
  "delete": false,
  "createAll": true,
  "updateAll": false,
  "deleteAll": false,
  "customEvents": ["revision.create"]
}
```
This will create a new custom event `revision.create` which will fire whenever a new revision is created.
This makes it easy to integrate Scoold with services like Zapier because it implements the
[RESTHooks](https://resthooks.org/) best practices.

Finally, you can configure a webhook so that it is only fired when the payload matches a certain filter.
A filter could contain one or more values of a property, e.g. `tags:tag1,tag2`. If the payload inside the webhook matches
the filter, then the payload is sent to the target URL, otherwise it is ignored.
Here are some examples of webhook property filters:
- `tags:tag1,tag2` - payload must contain a **list** property `tags` and it must have **both** `tag1` and `tag2` in it
- `tags:tag1|tag2` - payload must contain a **list** property `tags` and it must have **either** `tag1` or `tag2` in it
- `name:Gordon` - payload must contain a **String** property and it must be `Gordon`
- `name:Gordon|Joe` - payload must contain a **String** property and it must be **either** `Gordon` or `Joe`
- `tags:-` - payload must contain a **list** or **string** property `tags` and it **must be empty**

For more details about webhooks, please read the [Para docs on webhooks](https://paraio.org/docs/#011-webhooks).

## Session management and duration

By default, only one session is allowed per user/browser. When a user logs in from one device, they will automatically be
logged out from every other device. This can be disabled to allow multiple simultaneous sessions with:

```ini
scoold.security.one_session_per_user = false
```

User session cookies in Scoold expire after 24h. To change the session duration period to 6h for example, set
`scoold.session_timeout = 21600` (6h in seconds) and restart. In 6h the Scoold authentication cookie will expire and so
will the access token (JWT) inside the cookie.

## Domain-restricted user registrations

You can restrict signups only to users from a particular identity domain, say `acme-corp.com`. To do so, set the
following configuration property:
```ini
scoold.approved_domains_for_signups = "acme-corp.com"
```
Then a user with email `john@acme-corp.com` will be allowed to login (the identity provider is irrelevant), but user
`bob@gmail.com` will be denied access.

**PRO** In Scoold Pro, this setting can also contain a comma-separated list of identity domains:
```ini
scoold.approved_domains_for_signups = "acme-corp.com,gmail.com"
```

## Admins

You can specify the user with administrative privileges in your `scoold-application.conf` file:
```ini
scoold.admins = "joe@example.com"
```
**PRO** In Scoold Pro, you can have multiple admin users by specifying a comma-separated list of user identifiers.
This works both for new and existing users.
```ini
scoold.admins = "joe@example.com,fb:1023405345366,gh:1234124"
```

If you remove users who are already admins from the list of admins `scoold.admins`, they will be *demoted* to regular
users. Similarly, existing regular users will be *promoted* to admins if they appear in the list above.

## Anonymous posts

**PRO** This feature is enabled with `scoold.anonymous_posts_enabled = true`. It allows everyone to ask questions and write
replies, without having a Scoold account. Posting to the "Feedback" section will also be open without requiring users
to sign in. This feature is disabled by default.

## Anonymous profiles

People may wish to make their profile details anonymous from the Settings page. To allow this option set:
```ini
scoold.profile_anonimity_enabled = true
```

## Spam protection

Scoold can be configured to detect and block spam content with the help of the Akismet API. To enable this functionality,
specify your Akismet API key like this:

```ini
scoold.akismet_api_key = "xyz123"
```

By default, all content published on the site will be scanned for spam by Akismet and if spam is detected, that content
will be ignored and the user will get an error, preventing them from posting it. If you turn off automatic protection,
a report will be created each time a spam post is detected so that mods/admins can take action on it. In the meantime
the post would be marked as "pending approval".

```ini
scoold.automatic_spam_protection_enabled = false
```

## Enabling the "Feedback" section

You can enable or disable the "Feedback" page where people can discuss topics about the website itself or submit general
feedback. This section is disabled by default and can be activated with `scoold.feedback_enabled = true`.

## LaTeX/MathML support and advanced highlighting

**PRO** You can enable this feature by setting `scoold.mathjax_enabled = true`. Then you can use MathML expressions by surrounding
them with `$$` signs, e.g. `$$ \frac {1}{2} $$` By default, MathJax is disabled.

The Prism syntax highlighter is included and it supports many different languages. You need to specify the language for
each code block if you want the highlighting to be more accurate (see [all supported languages](https://prismjs.com/#languages-list)).
For example:

    ```csharp
    var dict = new Dictionary<string>();
    ```




## Mentions

**PRO** In Scoold Pro, you can mention anyone in a question, answer or comment with `@Name`. A popup menu will appear once you
start typing after `@` giving you a list of names to choose from. The selected user will be mentioned with a special
mention tag in the form of `@<userID|John Doe>`. You can edit the name part of that tag (after `|`) but nothing else,
if you want the mention to work. You can mention up to 10 people in a post.

Users can opt-in to receive email notifications when they are mentioned or that can be switched on/off by admins.
For the latter option set:
```ini
scoold.mention_emails_controlled_by_admins = true
```

In certain cases, there may be lots of people with identical or similar names within a team which could make it difficult
to tell them apart when trying to mention them. For such scenarios, there is an option to show additional details for
each user, like username and tags. This is enabled like so:

```ini
scoold.user_autocomplete_details_enabled = true
```

## Security headers

Scoold attaches several security headers to each response. These can be enabled or disabled with the following configuration
properties:

```ini
# Strict-Transport-Security
scoold.hsts_header_enabled = true

# X-Frame-Options
scoold.framing_header_enabled = true

# X-XSS-Protection
scoold.xss_header_enabled = true

# X-Content-Type-Options
scoold.contenttype_header_enabled = true

# Referrer-Policy
scoold.referrer_header_enabled = true
```

## Voting

By default, votes expire after a certain period, meaning the same user can vote again on the same post
(after 30 days by default). Votes can also be amended within a certain number of seconds (30s by default).
There are two configurable parameters which allow you to modify the length of those periods:
```ini
scoold.vote_locked_after_sec = 30
scoold.vote_expires_after_sec = 2592000
```

## Customizing the UI

There are a number of settings that let you customize the appearance of the website without changing the code.
```ini
scoold.fixed_nav = false
scoold.show_branding = true
scoold.logo_url = "https://static.scoold.com/logo.svg"
scoold.logo_width = 90

# footer HTML - add your own links, etc., escape double quotes with \"
scoold.footer_html = "<a href=\"https://my.link\">My Link</a>"
# show standard footer links
scoold.footer_links_enabled = true
# favicon image location
scoold.favicon_url = "/favicon.ico"
# add your own external stylesheets
scoold.external_styles = "https://mydomain.com/style1.css, https://mydomain.com/style2.css"
# appends extra CSS rules to the main stylesheet
scoold.inline_css = ""
# edit the links in the footer of transactional emails
scoold.emails_footer_html = ""
# change the logo in transactional emails
scoold.small_logo_url = "https://scoold.com/logo.png"
# enable/disable dark mode
scoold.dark_mode_enabled = true
# enabled/disable Gravatars
scoold.gravatars_enabled = true
# pattern of default image of Gravatars (https://fr.gravatar.com/site/implement/images/)
scoold.gravatars_pattern = "retro"

# custom navbar links
scoold.navbar_link1_url = ""
scoold.navbar_link2_url = ""
scoold.navbar_link1_text = "Link1"
scoold.navbar_link2_text = "Link2"
scoold.navbar_link1_target = "_self"
scoold.navbar_link2_target = "_self"

# custom navbar menu links (shown to logged in users)
scoold.navbar_menu_link1_url = ""
scoold.navbar_menu_link2_url = ""
scoold.navbar_menu_link1_text = "Menu Link1"
scoold.navbar_menu_link2_text = "Menu Link2"
scoold.navbar_menu_link1_target = "_self"
scoold.navbar_menu_link2_target = "_self"

# default email notification toggles for all users
scoold.favtags_emails_enabled = false
scoold.reply_emails_enabled = false
scoold.comment_emails_enabled = false

# comment input box toggle
scoold.always_hide_comment_forms = true

# show/hide user profiles and users page
scoold.users_discoverability_enabled = true
```

### Custom Logo

**PRO** In Scoold Pro, you can change the logo of the website just by dragging and dropping a new image of your choice.

If you wish to add just a few simple CSS rules to the `<head>` element, instead of replacing the whole stylesheet,
simply add them as inline CSS:
```ini
scoold.inline_css = ".scoold-logo { width: 100px; }"
```

### Custom welcome message (banner)

You can set a short welcome message for unauthenticated users which will be displayed on the top of the page and it
can also contain HTML (**use only single quotes or escape double quotes `\\\"`**):
```ini
scoold.welcome_message = "Hello and welcome to <a href='https://scoold.com'>Scoold</a>!"
```
You can also set a custom message for users who are already logged in:
```ini
scoold.welcome_message_onlogin = "<h2>Welcome back <img src=\\\"{{user.picture}}\\\" width=30> <b>{{user.name}}</b>!</h2>"
```
Here you can use HTML tags and Mustache placeholders to show data from the `Profile` object of the logged in user.
For a list of available user properties, take a look at the
[`Profile`](https://github.com/Erudika/scoold/blob/master/src/main/java/com/erudika/scoold/core/Profile.java)
and [`Sysprop`](https://github.com/Erudika/para/blob/master/para-core/src/main/java/com/erudika/para/core/Sysprop.java)
classes.

### Custom links in navbar

There are a total of 4 slots for external links in the navbar area - two links publicly visible can go in the navbar and
another two links can go in the navbar menu, shown only to logged in users. Here's how to set a private link in the
navbar menu:
```ini
scoold.navbar_menu_link1_url = "https://homepage.com"
scoold.navbar_menu_link1_text = "Visit my page"
```

### Expert-level customization

If you want to completely customize the frontend code, clone this repository and edit the files you want:

- **HTML** templates are in `src/main/resources/templates/`
- **CSS** stylesheets can be found in `src/main/resources/static/styles/`
- **JavaScript** files can be found in `src/main/resources/static/scripts/`
- **Images** are in located in `src/main/resources/static/images/`
- **Themes** are in located in `src/main/resources/themes/`

In Scoold Pro, you don't have access to the files above but you can purchase the **Pro with Source code**
license, for full customization capability.

Also, please refer to the documentation for Spring Boot and Spring MVC.

## Third party cookie consent

Some countries have laws that require explicit cookie consent (e.g. GDPR, CCPA). Scoold can be integrated with Osano's
cookie consent script to enable the consent popup for compliance with those laws. Here's the configuration which enables
cookie consent:
```ini
scoold.cookie_consent_required = true
scoold.external_styles = "https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css"
scoold.external_scripts.bypassconsent1 = "https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
scoold.external_scripts.bypassconsent2 = "d2luZG93LmNvb2tpZWNvbnNlbnQuaW5pdGlhbGlzZSh7CiAgInBhbGV0dGUiOiB7CiAgICAicG9wdXAiOiB7CiAgICAgICJiYWNrZ3JvdW5kIjogIiM0NDQ0NDQiCiAgICB9LAogICAgImJ1dHRvbiI6IHsKICAgICAgImJhY2tncm91bmQiOiAiIzc3Nzc3NyIKICAgIH0KICB9LAogICJ0aGVtZSI6ICJjbGFzc2ljIiwKICAicG9zaXRpb24iOiAiYm90dG9tLWxlZnQiLAogICJ0eXBlIjogIm9wdC1pbiIsCiAgIm9uU3RhdHVzQ2hhbmdlIjogZnVuY3Rpb24ocyl7bG9jYXRpb24ucmVsb2FkKCk7fQp9KTs="
```
That last snippet of code is the Base64-encoded initialization of the cookie consent script:
```js
window.cookieconsent.initialise({
  "palette": {
    "popup": {
      "background": "#444444"
    },
    "button": {
      "background": "#777777"
    }
  },
  "theme": "classic",
  "position": "bottom-left",
  "type": "opt-in",
  "onStatusChange": function(s){location.reload();}
});
```
You can customize the above snippet however you like from [Osano's download page (Start coding link)](https://www.osano.com/cookieconsent/download/).
After you customize the snippet, it is important that you add `"onStatusChange": function(s){location.reload();}` at the end.

**Enabling cookie consent will automatically disable all external scripts (like Google Analytics, etc.),
until the user gives their explicit consent.**

Note: Any other script can be used instead, as long as it set a cookie `cookieconsent_status = "allow"`.

## REST API

The REST API can be enabled with the following configuration:
```ini
scoold.api_enabled = true
# A random string min. 32 chars long
scoold.app_secret_key = "change_to_long_random_string"
```
The API can be accessed from `/api/*` and the OpenAPI documentation and console are located at `/apidocs`.
API keys can be generated from the "Administration" page and can be made to expire after a number of hours or never
(validity period = 0). Keys are in the JWT format and signed with the secret defined in `scoold.app_secret_key`.
API keys can also be generated with any JWT library. The body of the key should contain the `iat`, `appid` and `exp`
claims and must be signed with the secret `scoold.app_secret_key`.

**Note:** The Scoold API also accepts Para "super" tokens (manually generated) or JWTs generated using the
[Para CLI tool](https://github.com/Erudika/para-cli).

You can use the public endpoint `http://localhost:8000/api` to check the health of the server. A `GET /api` will
return `200` if the server is healthy and connected to Para, otherwise status code `500` is returned.
The response body is similar to this:
```
{
  "healthy": true,
  "message": "Scoold API, see docs at http://localhost:8000/apidocs",
  "pro": false
}
```

API clients can be auto-generated using [Swagger Codegen](https://github.com/swagger-api/swagger-codegen). You can
also open the [API schema file](src/main/resources/templates/api.yaml) in [the Swagger Editor](https://editor.swagger.io/)
and generate the clients from there.
