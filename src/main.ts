import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppSiteModule } from './app/site/app.module';
import { AppModule } from './app/admin/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
if(window.location.pathname.split('/')[1] == "" || window.location.pathname.split('/')[1] != 'admin' )
{
	platformBrowserDynamic().bootstrapModule(AppSiteModule)
	  .catch(err => console.log(err));
}else{
		platformBrowserDynamic().bootstrapModule(AppModule)
	  .catch(err => console.log(err));
}
