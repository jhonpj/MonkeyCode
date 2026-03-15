package cli

import (
	"encoding/json"
	"os"
	"os/exec"

	"github.com/chaitin/MonkeyCode/backend/domain"
)

// cli 脚本工具
const scriptPath = "./tools/dist/cli.cjs"

// RunCli 运行monkeycode-cli命令
//
//	@Tags			CLI
//	@Summary		运行monkeycode-cli命令
//	@Description	运行monkeycode-cli命令
//	@Accept			json
//	@Produce		json
//	@Param			command	    path		string				        true	"命令"
//	@Param			flag	    query		string				        false	"标志"
//	@Param			fileMetas	body		[]domain.FileMeta			true	"代码文件信息"
//	@Success		200		    {object}	[]domain.IndexResult	            "输出结果"
//	@Failure		500		    {object}	web.Resp			                "内部错误"
//	@Router			/api/v1/cli/{command} [post]
func RunCli(command string, flag string, fileMetas []domain.FileMeta) ([]domain.IndexResult, error) {
	inputJson, err := json.Marshal(fileMetas)
	if err != nil {
		return []domain.IndexResult{}, err
	}

	var cmd *exec.Cmd
	if flag == "" {
		cmd = exec.Command(scriptPath, command, string(inputJson))
	} else {
		cmd = exec.Command(scriptPath, command, flag, string(inputJson))
	}

	cmd.Env = os.Environ()
	output, err := cmd.CombinedOutput()
	if err != nil {
		return []domain.IndexResult{}, err
	}
	var res []domain.IndexResult
	err = json.Unmarshal(output, &res)
	if err != nil {
		return []domain.IndexResult{}, err
	}
	return res, nil
}
