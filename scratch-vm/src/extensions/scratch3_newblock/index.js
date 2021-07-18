const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');
var global_temp = "";
class newblock 
{
	get TEST_MENU () 
	{
		return [{text: '1',value: '1'},{text: '2',value: '2'}]
	}
	constructor (runtime) {this.runtime = runtime;}
	getInfo () 
	{
		return {
			id: 'newblocks',
			name: 'New Blocks',
			menus:
			{
				testMenu:
				{
					acceptReporters: true,
					items: this.TEST_MENU
				}
			},
			blocks: [
			{
				opcode: 'function1',
				blockType: BlockType.REPORTER,
				text: 'Value'
			},
			{
				opcode: 'function2',
				blockType: BlockType.COMMAND,
				text: 'Test [DATA][OPTION]',
				arguments: 
				{
					DATA: 
					{
						type: ArgumentType.STRING,defaultValue: "data"
					},
					OPTION:
					{
						type: ArgumentType.STRING,
						menu: 'testMenu',
						defaultValue: ""
					}
				}
			}]
		};
	};
	function1(){return global_temp;}
	function2(args)
	{
		const DATA = Cast.toString(args.DATA);
		const OPTION = Cast.toString(args.OPTION);
		global_temp = DATA + "," + OPTION;
		log.log(DATA);
		log.log(OPTION);
	}
}

module.exports = newblock;
