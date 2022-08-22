import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
//import { Subscription } from "rxjs/Subscription";

import { ServersService } from "../servers.service";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  //paramsSubscription: Subscription;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.params["id"]; // *ok
    this.server = this.serversService.getServer(id);

    // this.server = {
    //   id: Number(this.route.snapshot.params["id"]),
    //   name: this.route.snapshot.params["name"],
    //   status: this.route.snapshot.params["status"],
    // };
    // ! reacting to changes from observable
    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params["id"]);
      // this.server.id = Number(params["id"]);
      // this.server.name = params["name"];
      // this.server.status = params["status"];
    });
  }

  //! dont need if params do not change
  // ngOnDestroy() {
  //   this.paramsSubscription.unsubscribe();
  // }
}
