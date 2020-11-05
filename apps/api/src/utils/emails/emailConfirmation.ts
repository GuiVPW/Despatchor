interface UserVerification {
	token: string
	name: string
}
export const confirmationEmail = ({ token, name }: UserVerification): string => {
	return `
  <table width="100%" height="100%" align="center" border="0" cellpadding="0" cellspacing="0"
	style="background-color:#FFF;border:0;border-collapse:collapse;border-spacing:0;vertical-align: center;"
	bgcolor="#FFF">
	<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
	</style>
  <div style="background-color:white;">
      </div>
      <div style="margin:0px auto;max-width:520px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:12px 10% 4px 10%;text-align:center;">
                <div class="mj-column-per-100 outlook-group-fix"
                  style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                    width="100%">
                    <tr>
                      <td align="center" style="font-size:0px;padding:8px 0 0 0;word-break:break-word;">
                        <div
                          style="font-family:-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif;font-size:22px;font-weight:600;line-height:1.2;text-align:center;color:#000000;">
                          Bem-vindo ao Despatchor!
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="margin:0px auto;max-width:520px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                <div class="mj-column-per-100 outlook-group-fix"
                  style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                    width="100%">
                    <tr>
                      <td align="center" style="font-size:0px;padding:16px 16px 0 16px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                          style="border-collapse:collapse;border-spacing:0px;">
                          <tbody>
                            <tr>
                              <td style="width:488px;"> <img alt="despatchor-banner" height="auto"
                                  src="https://i.imgur.com/Clj46B5.jpg"
                                  style="border:0;border-radius:12px;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                  width="488" /> </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="margin:0px auto;max-width:520px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:12px 10% 0 10%;text-align:center;">
                <div class="mj-column-per-100 outlook-group-fix"
                  style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                    width="100%">
                    <tr>
                      <td align="center" style="font-size:0px;padding:8px 0 16px 0;word-break:break-word;">
                        <div
                          style="font-family:-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif;font-size:18px;font-weight:600;line-height:1.4;text-align:left;color:#8E8E92;">
                          <span style="color: #000000;">Olá ${name}!</span>
                          <br />
                          Para começar a usar a plataforma, confirme seu e-mail clicando no botão abaixo!
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" vertical-align="middle" class="type-cta"
                        style="font-size:0px;padding:8px 0;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                          style="border-collapse:separate;line-height:100%;">
                          <tr>
                            <td align="center" bgcolor="#000000" role="presentation"
                              style="border:none;border-radius:6px;cursor:auto;mso-padding-alt:12px 12px;background:#000000;"
                              valign="middle">
                              <a href="http://localhost:3000/signup/email/${token}"
                                style="display:inline-block;background:#000000;color:#ffffff;font-family:-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif;font-size:15px;font-weight:600;line-height:1;margin:0;text-decoration:none;text-transform:none;padding:12px 12px;mso-padding-alt:0px;border-radius:6px;"
                                target="_blank">
                                Confirmar Email
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="margin:0px auto;max-width:520px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:112px 16px 32px 16px;text-align:center;">
                <div class="mj-column-per-100 outlook-group-fix"
                  style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                    width="100%">
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                      </td>
                    </tr>
                    <tr>
                      <td align="center" vertical-align="middle"
                        style="font-size:0px;padding:0;padding-top:4px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                          style="border-collapse:separate;line-height:100%;">
                          <tr>
                            <td align="center" role="presentation"
                              style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:4px 0;background:none;display:inline-block;background:none;color:#8E8E92;font-family:-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif;font-size:11px;font-weight:500;line-height:1.4;margin:0;text-decoration:none;text-transform:none;padding:4px 0;mso-padding-alt:0px;border-radius:3px;"
                              valign="middle">
                              ©2020 Despatchor
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <br />
`
}

export default confirmationEmail
