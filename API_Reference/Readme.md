## Class File
### ppfs\_file\_Add
```
ppfs-user-cli file add              上传一个文件到本地存储Local-Storage
    [--progress | -p]               显示上传进度
    [--encrpt=<encrpt>]             是否加密：1->加密，0->不加密
    <local-path>                    上传文件本地路径，返回文件ppfs-file-path，即文件hash，基于内容的地址，path即hash
                                    -涉及到文件的切片方式，不同的切片返回不同的ppfs-file-path
                                    -涉及到文件是否加密，加密与否返回不同的ppfs-file-path
```

**参数**

1. path代表要上传的文件路径
2. encrypt代表是否加密

**返回值**

上传文件的hash

**示例**

```
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ppfs_file_Add","params":{"path":"/a/b/c.dat","encrypt":true},"id":3}'

// Result
{
  "id":3,
  "jsonrpc": "2.0",
  "result": "e91ba0972b9055187fa2efa8b5c156f487a8293a"
}
```
