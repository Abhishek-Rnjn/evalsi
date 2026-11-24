"""A sandbox RPC that returns no response raises SandboxError, not AttributeError.

grpcio returns ``None`` from an awaited call when it cannot decode the reply.
CI once hit this in Sandbox.snapshot() as "'NoneType' object has no attribute
'snapshot_id'"; these tests need no sandbox server.
"""

from __future__ import annotations

import asyncio
from types import SimpleNamespace
from typing import Any

import pytest

from evalsi.sandbox import SandboxError
from evalsi.sandbox.client import Isolation, Sandbox, SandboxClient


class _NoReplyStub:
    """Every RPC resolves to None, as grpcio does after a failed decode."""

    def __getattr__(self, method: str) -> Any:
        async def call(*_args: Any, **_kwargs: Any) -> None:
            return None

        return call


def _sandbox() -> Sandbox:
    client = SimpleNamespace(stub=_NoReplyStub())
    return Sandbox(client, "sbx_test", Isolation(driver="test", level="none", enforcement="full"))  # type: ignore[arg-type]


@pytest.mark.parametrize(
    ("method", "call"),
    [
        ("Snapshot", lambda s: s.snapshot()),
        ("ReadFiles", lambda s: s.read_files(["a.txt"])),
        ("ListProcesses", lambda s: s.list_processes()),
        ("KillProcess", lambda s: s.kill_process("p1")),
        ("Stats", lambda s: s.egress()),
    ],
)
def test_a_sandbox_call_without_a_reply_names_the_rpc(method: str, call: Any) -> None:
    with pytest.raises(SandboxError, match=f"{method} returned no response"):
        asyncio.run(call(_sandbox()))


def test_a_client_call_without_a_reply_names_the_rpc() -> None:
    client = SandboxClient.__new__(SandboxClient)
    client.stub = _NoReplyStub()  # type: ignore[assignment]
    with pytest.raises(SandboxError, match="Create returned no response"):
        asyncio.run(client.create())
    with pytest.raises(SandboxError, match="Probe returned no response"):
        asyncio.run(client.probe())
