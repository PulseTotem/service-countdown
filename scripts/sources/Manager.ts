/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 */

/// <reference path="../../t6s-core/core-backend/scripts/Logger.ts" />
/// <reference path="../../t6s-core/core-backend/scripts/server/SourceItf.ts" />

/// <reference path="../../t6s-core/core-backend/t6s-core/core/scripts/infotype/Cmd.ts" />
/// <reference path="../../t6s-core/core-backend/t6s-core/core/scripts/infotype/CmdList.ts" />

/// <reference path="../CountdownNamespaceManager.ts" />

var uuid : any = require('node-uuid');

class Manager extends SourceItf {

	/**
	 * Constructor.
	 *
	 * @param {Object} params - Source's params.
	 * @param {CountdownNamespaceManager} countdownNamespaceManager - NamespaceManager attached to Source.
	 */
	constructor(params : any, countdownNamespaceManager : CountdownNamespaceManager) {
		super(params, countdownNamespaceManager);

		if (this.checkParams(["InfoDuration", "Limit", "Logo", "Title", "Content"])) {
			countdownNamespaceManager.setParams(params);
			this.run();
		}
	}

	/**
	 * Method to run action attached to Source.
	 *
	 * @method run
	 */
	public run() {
		var countdownNamespaceManager : any = this.getSourceNamespaceManager();

		if(countdownNamespaceManager.getCmd() == null) {
			var cmdId = uuid.v1();
			countdownNamespaceManager.setCmdId(cmdId);
			var cmd:Cmd = new Cmd(cmdId);
			cmd.setDurationToDisplay(parseInt(this.getParams().InfoDuration));
			cmd.setCmd("init");
			var args:Array<string> = new Array<string>();
			var countdownDesc:any = {
				logo: this.getParams().Logo,
				title: this.getParams().Title,
				content: this.getParams().Content
			};
			args.push(countdownDesc);
			cmd.setArgs(args);

			var list:CmdList = new CmdList(cmdId);
			list.addCmd(cmd);

			this.getSourceNamespaceManager().sendNewInfoToClient(list);
		}
	}
}