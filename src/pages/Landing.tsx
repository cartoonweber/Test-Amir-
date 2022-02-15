import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box, InputAdornment, OutlinedInput } from '@material-ui/core'
import Button from 'components/Button'
import Web3 from 'web3';

import TestABI from '../abis/test.json';

declare let window: any;

const Landing: React.FC = () => {
    const [account, setAccount] = useState('');
    const [pending, setPending] = useState(false);
    const [address, setAddress] = useState('');
    const [waccounts, setWAccounts] = useState<string[]>([]);
    const [owner, setOwner] = useState(false);
    const [descrition, setDescription] = useState('');
    const [_desc, set_Desc] = useState('');
    useEffect(() => {
        // window.ethereum.on('accountsChanged', function (accounts: any) {
        //     // Time to reload your interface with accounts[0]!
        //     onConnect();
        // });
        onConnect();
    }, [])
    const onConnect = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                const accounts = await window.web3.eth.getAccounts();
                setAccount(accounts[0]);
                const contract = await new window.web3.eth.Contract(TestABI, '0xe9cD1725Ca90fB4FE0E1cBC98d16a269Bd9f43FE');
                const owner = await contract.methods.owner().call();
                console.log(owner);
                setOwner(owner === accounts[0]);
                const temp = await contract.methods.getWhiteListUsers().call();
                setWAccounts(temp);
                if (temp.includes(accounts[0])) {
                    const desc = await contract.methods.descriptions(accounts[0]).call();
                    setDescription(desc);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    const onAddWhiteList = async () => {
        try {
            if (address.length !== '0xe9cD1725Ca90fB4FE0E1cBC98d16a269Bd9f43FE'.length) {
                alert("Input correct address");
                return;
            }
            const contract = await new window.web3.eth.Contract(TestABI, '0xe9cD1725Ca90fB4FE0E1cBC98d16a269Bd9f43FE');
            await contract.methods.setWhiteList(address).send({ from: account });
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        }
        catch (error) {
            console.log(error);
        }
    }

    const onSetDescription = async () => {
        try {
            if (!_desc.length) {
                alert("Please Input correct description");
                return;
            }
            const contract = await new window.web3.eth.Contract(TestABI, '0xe9cD1725Ca90fB4FE0E1cBC98d16a269Bd9f43FE');
            await contract.methods.setDescriptions(_desc).send({ from: account });
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <StyledContainer>
            <Box color={'white'} textAlign={'center'} mt={'200px'} fontSize={'40px'}>Descriptions</Box>
            <Box color={'DodgerBlue'} textAlign={'center'} mt={'20px'} fontSize={'40px'}>
                {waccounts.includes(account) ? (descrition.length ? descrition : 'Please Set Descriptions') : 'You are not whitelisted User'}</Box>
            <Box pt="100px" color="white" textAlign={"center"} fontSize={36} >Account : {account}</Box>
            {owner ? <Box display={"flex"} alignItems={"center"} px="15%" pt="20px">
                <CustomInput className="amountinput" value={address}
                    onChange={(event: any) => {
                        setAddress(event.target.value);
                    }} />
                <Box ml="50px">
                    {!account.length ?
                        <Button type="secondary" onClick={() => onConnect()}>Connect Wallet</Button>
                        : ''
                    }
                    {account.length ?
                        <Button type="primary" onClick={() => !pending && onAddWhiteList()}>{pending ? 'Loading...' : 'Add to Whitelist'}</Button>
                        : ''
                    }
                </Box>
            </Box> : ''}

            {waccounts.includes(account) ? <Box display={"flex"} alignItems={"center"} px="15%" pt="20px">
                <CustomInput className="amountinput" value={_desc}
                    onChange={(event: any) => {
                        set_Desc(event.target.value);
                    }} />
                <Box ml="50px">
                    {!account.length ?
                        <Button type="secondary" onClick={() => onConnect()}>Connect Wallet</Button>
                        : ''
                    }
                    {account.length ?
                        <Button type="primary" onClick={() => !pending && onSetDescription()}>{pending ? 'Loading...' : 'Set Description'}</Button>
                        : ''
                    }
                </Box>
            </Box> : ''}

            <Box color={'white'} textAlign={'center'} mt={'20px'} fontSize={'40px'}>WhiteListed Users</Box>
            {waccounts.map((data, i) => {
                return <Box key={i} color={'white'} textAlign={'center'} mt={'20px'} fontSize={'40px'}>{data}</Box>
            })}
        </StyledContainer >
    )
}

const CustomInput = styled(OutlinedInput)`
    font-size: 40px !important;
    width: 100%;
    margin-top: 10px;
    border-radius: 10px!important;
    border : 1px solid rgb(253, 136, 19);
    color : white!important;
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
`
const StyledContainer = styled(Box)`
    min-height : 100vh;
    width : 100%;
    background-image : url('/images/background.png');
    background-size : 100% 100%;
    position : relative;
    padding-bottom : 200px;
`

export default Landing