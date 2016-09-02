/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 */

/// <reference path="../t6s-core/core-backend/scripts/session/SessionSourceNamespaceManager.ts" />

/// <reference path="./sources/Manager.ts" />
/// <reference path="../t6s-core/core-backend/t6s-core/core/scripts/infotype/Cmd.ts" />
/// <reference path="../t6s-core/core-backend/t6s-core/core/scripts/infotype/CmdList.ts" />
/// <reference path="../t6s-core/core-backend/t6s-core/core/scripts/infotype/priorities/InfoPriority.ts" />

var moment : any = require('moment');

/**
 * Represents the PulseTotem Countdown's SessionSourceNamespaceManager for each call from PulseTotem's Client.
 *
 * @class CountdownNamespaceManager
 * @extends SessionSourceNamespaceManager
 */
class CountdownNamespaceManager extends SessionSourceNamespaceManager {

    /**
     * Constructor.
     *
     * @constructor
     * @param {any} socket - The socket.
     */
    constructor(socket : any) {
        super(socket);
	    this.addListenerToSocket('Manager', function(params : any, self : CountdownNamespaceManager) { (new Manager(params, self)) });
    }

	/**
	 * Lock the control of the Screen for the Session in param.
	 *
	 * @method lockControl
	 * @param {Session} session - Session which takes the control of the Screen.
	 */
	lockControl(session : Session) {
		var self = this;

		/*var cmd : Cmd = new Cmd(session.id());
		cmd.setPriority(InfoPriority.HIGH);
		cmd.setDurationToDisplay(3600);
		cmd.setCmd("StartSession");
		var args : Array<string> = new Array<string>();
		args.push(self.socket.id);
		args.push(JSON.stringify(session));
		args.push(this.getParams().BackgroundURL);
		cmd.setArgs(args);

		var list : CmdList = new CmdList(session.id());
		list.addCmd(cmd);

		self.sendNewInfoToClient(list);*/
		Logger.debug("CountdownNamespaceManager : lockControl");
	}


	/**
	 * Unlock the control of the Screen for the Session in param.
	 *
	 * @method unlockControl
	 * @param {Session} session - Session which takes the control of the Screen.
	 */
	unlockControl(session : Session) {
		var self = this;

		/*var cmd : Cmd = new Cmd(session.id());
		cmd.setPriority(InfoPriority.HIGH);
		cmd.setDurationToDisplay(3);
		cmd.setCmd("FinishSession");
		var args : Array<string> = new Array<string>();
		args.push(self.socket.id);
		args.push(JSON.stringify(session));
		cmd.setArgs(args);

		var list : CmdList = new CmdList(session.id());
		list.addCmd(cmd);

		self.sendNewInfoToClient(list);*/

		Logger.debug("CountdownNamespaceManager : unlockControl");
	}

	/**
	 * Method called when socket is disconnected.
	 *
	 * @method onClientDisconnection
	 */
	onClientDisconnection() {
		super.onClientDisconnection();
		var self = this;
		
		//self.getSessionManager().finishActiveSession();
		Logger.debug("CountdownNamespaceManager : onClientDisconnection")
	}
}