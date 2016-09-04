/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 */

/// <reference path="../t6s-core/core-backend/scripts/server/SourceNamespaceManager.ts" />

/// <reference path="./sources/Manager.ts" />
/// <reference path="../t6s-core/core-backend/t6s-core/core/scripts/infotype/Cmd.ts" />
/// <reference path="../t6s-core/core-backend/t6s-core/core/scripts/infotype/CmdList.ts" />
/// <reference path="../t6s-core/core-backend/t6s-core/core/scripts/infotype/priorities/InfoPriority.ts" />

var moment : any = require('moment');

/**
 * Represents the PulseTotem Countdown's SourceNamespaceManager for each call from PulseTotem's Client.
 *
 * @class CountdownNamespaceManager
 * @extends SourceNamespaceManager
 */
class CountdownNamespaceManager extends SourceNamespaceManager {

	/**
	 * CmdId
	 *
	 * @property _cmdId
	 * @type string
	 */
	private _cmdId : string;

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
	 * Set the client profilId..
	 *
	 * @method setCmdId
	 * @param {string} cmdId - Cmd's Id.
	 */
	setCmdId(cmdId : string) {
		this._cmdId = cmdId;
	}

	/**
	 * Method called when external message come (from API Endpoints for example).
	 *
	 * @method onExternalMessage
	 * @param {string} from - Source description of message
	 * @param {any} message - Received message
	 */
	onExternalMessage(from : string, message : any) {
		var cmd:Cmd = new Cmd(this._cmdId);
		cmd.setPriority(InfoPriority.HIGH);
		cmd.setDurationToDisplay(86400);
		cmd.setCmd(from);
		var args:Array<string> = new Array<string>();
		args.push(message);
		cmd.setArgs(args);

		var list:CmdList = new CmdList(this._cmdId);
		list.addCmd(cmd);

		this.sendNewInfoToClient(list);
	}
}